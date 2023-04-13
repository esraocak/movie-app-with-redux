import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile, } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/registerSlice";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";


//* Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA1JOWP6AF90-z5uTM5zwsDZoAdGOsTek",
    authDomain: "movie-app-with-redux.firebaseapp.com",
    databaseURL: "https://movie-app-with-redux-default-rtdb.firebaseio.com",
    projectId: "movie-app-with-redux",
    storageBucket: "movie-app-with-redux.appspot.com",
    messagingSenderId: "833274784383",
    appId: "1:833274784383:web:b4e2b002451f8d3548ad4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export const createUser = async (email, password, navigate, displayName) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan method
  try {
    let userCredential = await createUserWithEmailAndPassword (
    auth,
    email,
    password
  );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    toastSuccessNotify("Registered successfully!");
    // console.log(userCredential);
  } catch (error) {
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap

export const signIn = async (email, password,navigate) => {
  //? user daha önce kayıt olmuş ve login yapmak istediğinde
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // console.log("hellooo")
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
  // alert(error.message);
  }
};

export const userObserver = (dispatch) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu

  onAuthStateChanged(auth, (user) => {
   
    if (user) {
      const { email, displayName, photoURL } = user;
     dispatch(setCurrentUser({ email, displayName, photoURL }));
      // console.log(user);
    } else {
      dispatch(setCurrentUser(false));
      console.log("user signed out");
    }
  });
};


export const logOut = () => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully!");
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => settings => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle


export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};


export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};
