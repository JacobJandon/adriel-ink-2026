# OAuth Authentication Setup

## Overview
Adriel AI now supports OAuth authentication with Google and GitHub for user login and signup.

## Configured OAuth Providers

### Google OAuth
- **Client ID**: `260531094035-****************************apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-****************************`
- **Scopes**: `openid`, `email`, `profile`
- **Redirect URI**: `https://adriel.ink/api/auth/google/callback`

### GitHub OAuth
- **Client ID**: `Ov23li******************`
- **Client Secret**: `********************************` (configured in environment variables)
- **Scopes**: `read:user`, `user:email`
- **Redirect URI**: `https://adriel.ink/api/auth/github/callback`

## Environment Variables

The OAuth credentials are configured in:
- `.dev.vars` - Development environment
- `.prod.vars` - Production environment

Both files contain:
```bash
# Google OAuth
GOOGLE_CLIENT_ID="260531094035-****************************apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-****************************"

# GitHub OAuth
GITHUB_CLIENT_ID="Ov23li******************"
GITHUB_CLIENT_SECRET="********************************"
```

**Note**: The actual credentials are stored in the gitignored `.dev.vars` and `.prod.vars` files.

## Security Notes

⚠️ **IMPORTANT**: These files are gitignored and should NEVER be committed to version control.

- `.dev.vars` and `.prod.vars` are listed in `.gitignore`
- Secrets are encrypted using `SECRETS_ENCRYPTION_KEY`
- JWT sessions use `JWT_SECRET` for token signing

## OAuth Flow

1. User clicks "Sign in with Google" or "Sign in with GitHub"
2. User is redirected to OAuth provider
3. After authorization, provider redirects back with authorization code
4. Backend exchanges code for access token
5. User profile is fetched and stored
6. JWT session token is created
7. User is logged in

## API Endpoints

- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/github` - Initiate GitHub OAuth flow
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `GET /api/auth/status` - Check authentication status
- `POST /api/auth/logout` - Log out user

## Testing OAuth Locally

1. Make sure `.dev.vars` has the OAuth credentials
2. Start the development server: `npm run dev`
3. Navigate to `http://localhost:5173`
4. Click "Sign in with Google" or "Sign in with GitHub"
5. Complete OAuth flow (will redirect to localhost callback)

## Deployment

When deploying to production:

1. Ensure `.prod.vars` is configured with OAuth credentials
2. Run deployment: `npm run deploy`
3. Wrangler will automatically use secrets from `.prod.vars`
4. OAuth will work with production domain: `https://adriel.ink`

## Troubleshooting

### OAuth Not Working
- Check that callback URLs are correctly configured in Google/GitHub OAuth apps
- Verify environment variables are loaded: check Cloudflare Workers environment
- Check browser console for CORS errors
- Ensure JWT_SECRET and SECRETS_ENCRYPTION_KEY are set

### "OAuth provider not configured" Error
- This means `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` or `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` are missing
- Verify `.dev.vars` or `.prod.vars` is in the project root
- Restart the development server after adding variables

## Managing OAuth Apps

### Google OAuth Console
- URL: https://console.cloud.google.com/apis/credentials
- Configure authorized redirect URIs
- Manage API quotas and usage

### GitHub OAuth Apps
- URL: https://github.com/settings/developers
- Configure callback URLs
- Revoke/regenerate client secrets if needed

## Future Enhancements

Potential OAuth improvements:
- Add Microsoft/Azure AD OAuth
- Add Discord OAuth
- Add Twitter/X OAuth
- Implement OAuth token refresh
- Add OAuth scope customization
