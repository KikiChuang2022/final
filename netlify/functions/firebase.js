const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig  = {
  apiKey: "AIzaSyDvZX95Y84UprjGO_W0H0QNnuumu11nNFg",
  authDomain: "kiei-final-701a3.firebaseapp.com",
  projectId: "kiei-final-701a3",
  storageBucket: "kiei-final-701a3.appspot.com",
  messagingSenderId: "824038857443",
  appId: "1:824038857443:web:516f6bfa13fb260bed43d6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase