// Cookie Management Utility for Muscles & Balance
class CookieManager {
    // Set a cookie
    static set(name, value, days = 30) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
    }

    // Get a cookie
    static get(name) {
        return document.cookie.split('; ').find(row => row.startsWith(name + '='))
            ?.split('=')[1] ? decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]) : null;
    }

    // Delete a cookie
    static delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    // Check if cookies are enabled
    static isEnabled() {
        document.cookie = 'test=1';
        const enabled = document.cookie.indexOf('test=') !== -1;
        this.delete('test');
        return enabled;
    }
}

// User Preferences Management
class UserPreferences {
    static save(preferences) {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            CookieManager.set('userPrefs', JSON.stringify(preferences), 365);
        }
    }

    static load() {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            const prefs = CookieManager.get('userPrefs');
            return prefs ? JSON.parse(prefs) : {};
        }
        return {};
    }

    static update(key, value) {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            const prefs = this.load();
            prefs[key] = value;
            this.save(prefs);
        }
    }

    static get(key) {
        return this.load()[key];
    }
}

// Workout Session Management
class WorkoutSession {
    static save(sessionData) {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            CookieManager.set('workoutSession', JSON.stringify(sessionData), 7);
        }
    }

    static load() {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            const session = CookieManager.get('workoutSession');
            return session ? JSON.parse(session) : null;
        }
        return null;
    }

    static clear() {
        CookieManager.delete('workoutSession');
    }
}

// Remember user form data
class FormMemory {
    static save(formId, data) {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            CookieManager.set(`form_${formId}`, JSON.stringify(data), 30);
        }
    }

    static load(formId) {
        if (CookieManager.get('cookieConsent') === 'accepted') {
            const data = CookieManager.get(`form_${formId}`);
            return data ? JSON.parse(data) : null;
        }
        return null;
    }

    static clear(formId) {
        CookieManager.delete(`form_${formId}`);
    }
}

// Initialize cookie functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if cookies are enabled
    if (!CookieManager.isEnabled()) {
        Logger.warn('Cookies are disabled. Some features may not work properly.');
        return;
    }

    // Load user preferences
    const prefs = UserPreferences.load();
    
    // Apply saved theme if exists
    if (prefs.theme) {
        document.body.classList.add(`theme-${prefs.theme}`);
    }

    // Restore workout session if exists
    const session = WorkoutSession.load();
    if (session && window.location.pathname.includes('workout')) {
        restoreWorkoutForm(session);
    }

    // Auto-save form data on input
    setupFormAutoSave();
});

// Restore workout form data
function restoreWorkoutForm(session) {
    const fields = ['fitness-level', 'goal', 'preference', 'age', 'gender', 'equipment', 'days'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element && session[field]) {
            element.value = session[field];
        }
    });
}

// Setup auto-save for forms
function setupFormAutoSave() {
    // Workout form auto-save
    const workoutForm = document.querySelector('#workout-form, .workout-form');
    if (workoutForm) {
        const inputs = workoutForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const formData = {};
                inputs.forEach(inp => {
                    if (inp.value) formData[inp.id || inp.name] = inp.value;
                });
                WorkoutSession.save(formData);
            });
        });
    }

    // Nutrition form auto-save
    const nutritionForm = document.querySelector('#calorie-form, .nutrition-form');
    if (nutritionForm) {
        const inputs = nutritionForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const formData = {};
                inputs.forEach(inp => {
                    if (inp.value) formData[inp.id || inp.name] = inp.value;
                });
                FormMemory.save('nutrition', formData);
            });
        });
    }
}

// Cookie Consent Management
class CookieConsent {
    static show() {
        const popup = document.getElementById('cookie-consent');
        if (popup) {
            popup.classList.remove('hidden');
            setTimeout(() => popup.classList.add('show'), 100);
        }
    }

    static hide() {
        const popup = document.getElementById('cookie-consent');
        if (popup) {
            popup.classList.remove('show');
            setTimeout(() => popup.classList.add('hidden'), 300);
        }
    }

    static accept() {
        CookieManager.set('cookieConsent', 'accepted', 365);
        this.hide();
        Logger.info('Cookies accepted - full functionality enabled');
    }

    static decline() {
        CookieManager.set('cookieConsent', 'declined', 365);
        this.hide();
        Logger.info('Cookies declined - limited functionality');
    }

    static check() {
        const consent = CookieManager.get('cookieConsent');
        if (!consent && CookieManager.isEnabled()) {
            setTimeout(() => this.show(), 1000);
        }
        return consent;
    }

    static init() {
        // Show popup on every page until user makes a choice
        const consent = CookieManager.get('cookieConsent');
        if (!consent && CookieManager.isEnabled()) {
            setTimeout(() => this.show(), 1000);
        }
    }
}

// Initialize cookie consent on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set up cookie consent event listeners
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => CookieConsent.accept());
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => CookieConsent.decline());
    }
    
    // Check if consent popup should be shown
    CookieConsent.check();
});

// Export for global use
window.CookieManager = CookieManager;
window.UserPreferences = UserPreferences;
window.WorkoutSession = WorkoutSession;
window.FormMemory = FormMemory;
window.CookieConsent = CookieConsent;