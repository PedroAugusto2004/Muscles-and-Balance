# Firebase Setup Instructions

## GitHub Secrets Configuration

To enable automated deployment, you need to configure the Firebase service account secret in your GitHub repository.

### Step 1: Generate Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `muscles-and-balance-7`
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file

### Step 2: Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and Variables** → **Actions**
3. Click **New Repository Secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT_MUSCLES_AND_BALANCE_7`
5. Value: Paste the entire contents of the downloaded JSON file
6. Click **Add Secret**

### Step 3: Verify Deployment

Once the secret is configured:
- Push to `main` branch will trigger automatic deployment
- Check **Actions** tab to see deployment status
- Deployment will be skipped if secret is not configured

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy manually
firebase deploy
```

## Troubleshooting

**Error: "Input required and not supplied: firebaseServiceAccount"**
- The GitHub secret is not configured
- Verify secret name matches: `FIREBASE_SERVICE_ACCOUNT_MUSCLES_AND_BALANCE_7`
- Ensure JSON content is valid

**Deployment Skipped**
- This is normal when Firebase secret is not configured
- All other CI/CD steps (testing, linting, security) will still run
- Add the secret to enable automatic deployment