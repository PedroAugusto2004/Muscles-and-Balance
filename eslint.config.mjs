import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        // jQuery
        $: "readonly",
        jQuery: "readonly",
        // External libraries
        ScrollReveal: "readonly",
        Quagga: "readonly",
        jsPDF: "readonly",
        // Custom global classes (defined in cookies.js)
        CookieManager: "readonly",
        UserPreferences: "readonly",
        WorkoutSession: "readonly",
        FormMemory: "readonly",
        CookieConsent: "readonly",
        // Functions used in HTML onclick handlers
        getWorkoutPlan: "readonly",
        calculateCaloriesAndMacros: "readonly",
        exportToPDF: "readonly",
        calculateRecommendation: "readonly",
        redirectToSection: "readonly",
        openModal: "readonly",
        closeModal: "readonly",
        copyLink: "readonly",
        share: "readonly",
        filterRecipes: "readonly"
      }
    }
  }
];
