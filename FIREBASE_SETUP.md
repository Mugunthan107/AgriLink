# Enable Firebase Authentication

The error `auth/operation-not-allowed` means that the sign-in providers are disabled in your Firebase Console.

## Steps to Fix

1.  **Go to Firebase Console:**
    - Navigate to [console.firebase.google.com](https://console.firebase.google.com/).
    - Open your project (`agrilink-3c83b`).

2.  **Enable Authentication:**
    - Click on **Build** -> **Authentication** in the left sidebar.
    - Click **Get started** if you haven't already.

3.  **Enable Email/Password:**
    - Go to the **Sign-in method** tab.
    - Click on **Email/Password**.
    - Toggle **Enable** (the top switch).
    - Click **Save**.

4.  **Enable Google Sign-In:**
    - In the **Sign-in method** tab, click **Add new provider**.
    - Select **Google**.
    - Toggle **Enable**.
    - Set the **Project support email** (select your email from the dropdown).
    - Click **Save**.

5.  **Authorize Domain (Important for localhost):**
    - Ensure `localhost` is listed under **Authorized domains** in the **Settings** tab (usually added by default).

Once these steps are completed, try checking the login again on your local development server.
