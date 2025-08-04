# Deployment Documentation

## Overview
Muscles & Balance is deployed on Firebase Hosting with automated CI/CD pipeline through GitHub Actions.

## Live Application
- **Production URL:** https://muscles-and-balance-7.web.app
- **Firebase Console:** https://console.firebase.google.com/project/muscles-and-balance-7

---

## Prerequisites

### Required Tools
- Node.js 16+ and npm 8+
- Firebase CLI: `npm install -g firebase-tools`
- Git for version control

### Required Accounts
- Firebase account with project access
- GitHub account for repository access
- (Optional) Custom domain provider

---

## Local Development

### Setup
```bash
# Clone repository
git clone https://github.com/username/muscles-and-balance.git
cd muscles-and-balance

# Install dependencies
npm install

# Start local development server
npm run dev
# or
firebase serve --port 3000
```

### Development Commands
```bash
npm run dev          # Start development server
npm run lint         # Run code linting
npm run test         # Run test suite
npm run format       # Format code
npm run security     # Security audit
```

---

## Manual Deployment

### Firebase Setup
```bash
# Login to Firebase
firebase login

# Initialize project (if not already done)
firebase init hosting

# Deploy to production
npm run deploy
# or
firebase deploy
```

### Build Process
```bash
# Run full CI pipeline locally
npm run ci

# Deploy with custom message
firebase deploy -m "Release v1.0.0"
```

---

## Automated Deployment

### GitHub Actions Pipeline
Deployment is automated through `.github/workflows/test.yml`:

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Pipeline Stages:**
1. **Security Audit** - Vulnerability scanning
2. **Code Quality** - ESLint and Prettier checks
3. **Testing** - Jest test suite across Node 16, 18, 20
4. **Build Verification** - Ensure static files are ready
5. **Deploy** - Automatic Firebase deployment

### Required Secrets
Configure in GitHub repository settings:

```bash
FIREBASE_SERVICE_ACCOUNT  # Firebase service account JSON
CODECOV_TOKEN            # Code coverage reporting
SNYK_TOKEN              # Security scanning (optional)
```

### Service Account Setup
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Add JSON content to GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT`

---

## Environment Configuration

### Firebase Configuration
```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.htm"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Security Headers
```json
{
  "source": "**",
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    }
  ]
}
```

---

## Custom Domain Setup

### DNS Configuration
1. Add custom domain in Firebase Console
2. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 151.101.1.195, 151.101.65.195
   
   Type: CNAME
   Name: www
   Value: muscles-and-balance-7.web.app
   ```

### SSL Certificate
Firebase automatically provisions SSL certificates for custom domains.

---

## Monitoring & Analytics

### Firebase Analytics
- User engagement tracking
- Performance monitoring
- Error reporting

### Performance Monitoring
```javascript
// Performance tracking
const perf = getPerformance();
const trace = trace(perf, 'workout-generation');
trace.start();
// ... workout generation code
trace.stop();
```

### Error Monitoring
Errors are logged through the centralized `Logger` utility and can be monitored in Firebase Console.

---

## Rollback Procedures

### Quick Rollback
```bash
# View deployment history
firebase hosting:releases

# Rollback to previous version
firebase hosting:rollback
```

### Manual Rollback
1. Go to Firebase Console → Hosting
2. Select previous release
3. Click "Rollback"

---

## Backup & Recovery

### Code Backup
- Primary: GitHub repository
- Automated: GitHub Actions artifacts
- Local: Developer machines

### Data Backup
- User data: Firebase Authentication
- Analytics: Firebase Analytics (automatic)
- Logs: Firebase Console (90-day retention)

---

## Performance Optimization

### Build Optimization
- Static file compression
- Image optimization
- CSS/JS minification (manual)

### CDN Configuration
Firebase Hosting includes global CDN automatically.

### Caching Strategy
```javascript
// Service Worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## Troubleshooting

### Common Issues

**Deployment Fails:**
```bash
# Check Firebase CLI version
firebase --version

# Re-authenticate
firebase logout
firebase login
```

**Build Errors:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Permission Errors:**
- Verify Firebase project permissions
- Check service account key validity
- Ensure GitHub secrets are correctly configured

### Debug Commands
```bash
# Verbose deployment
firebase deploy --debug

# Test hosting locally
firebase serve --only hosting

# Check project status
firebase projects:list
```

---

## Support & Maintenance

### Regular Maintenance
- Weekly dependency updates (Dependabot)
- Monthly security audits
- Quarterly performance reviews

### Support Channels
- **Technical Issues:** GitHub Issues
- **Deployment Issues:** Firebase Support
- **General Support:** mailto:musclesbalance@gmail.com

### Documentation Updates
This deployment documentation should be updated when:
- New deployment steps are added
- Environment configuration changes
- New monitoring tools are integrated
- Security procedures are modified