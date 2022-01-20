# Login with SvelteKit and Firebase (server side)

How to handle authentication with Firebase Auth in SvelteKit on server side.

It uses a sameSite httpOnly cookie to store the idToken from Firebase Auth. The token persists in $session via hooks and load function on page refresh.

Also, `goto` is used instead of `window.location` for navigate/redirect after logged in and logged out.

> Note : Firebase SDKs are not used here, as I opted for Firebase REST API. Check endpoints in `src/routes/auth/`

[Try Live Demo](https://login-svelte-kit.vercel.app/)

```
email : mail@mail.com
password: mailmail
```

## Developing

Once you've cloned the repo, start a development server:

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Then create your own Firebase project, copy its Web API and add it in `.env` file like this :

```
VITE_FIREBASE_WEB_API="REPLACE-WITH-YOUR-WEB-API"
```

> Don't forget to add a user in Firebase Auth console.

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
