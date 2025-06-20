
let currentLang = 'en';

function toggleLanguage() {
  currentLang = (currentLang === 'en') ? 'ar' : 'en';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.ar;
  });
  document.getElementById("lang-toggle").innerHTML = 
    '<button onclick="toggleLanguage()">' + (currentLang === 'en' ? 'عربي' : 'English') + '</button>';
}

// Firebase setup (replace with real config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .catch(() => auth.createUserWithEmailAndPassword(email, pass))
    .then(user => {
      document.getElementById("auth-section").style.display = "none";
      document.getElementById("info-section").style.display = "block";
    });
}

function logout() {
  auth.signOut().then(() => {
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("info-section").style.display = "none";
  });
}

function saveInfo() {
  const info = document.getElementById("user-info").value;
  const user = auth.currentUser;
  if (user) {
    db.collection("userInfo").doc(user.uid).set({ info });
  }
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("info-section").style.display = "block";
    db.collection("userInfo").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        document.getElementById("user-info").value = doc.data().info || "";
      }
    });
  }
});
