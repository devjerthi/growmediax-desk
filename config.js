// GrowMediaX Desk — settings
// 1) allowedEmail: the ONLY Google account that can open the app.
// 2) firebase: paste the values from Firebase console > Project settings > Your apps > Web app > "SDK setup and configuration" (Config).
//    These values are not secret. Your data is protected by the Firestore security rules (see firestore.rules).

window.GMX_CONFIG = {
  allowedEmail: "devjerthi@gmail.com",

  firebase: {
    apiKey: "PASTE_API_KEY_HERE",
    authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
    projectId: "PASTE_PROJECT_ID",
    storageBucket: "PASTE_PROJECT_ID.appspot.com",
    messagingSenderId: "PASTE_SENDER_ID",
    appId: "PASTE_APP_ID"
  }
};
