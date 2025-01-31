const admin = require("firebase-admin");

const serviceAccount = require("./restaurant-search-8b6dc-firebase-adminsdk-wpoem-417a6c9a7c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db, admin };
