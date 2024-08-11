import firebase_app from "../../firebase/config";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export async function signInWithEmail(email, password) {
    let result = null,
        error = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGoogle() {
    let result = null,
        error = null;

    try {
        const googleProvider = new GoogleAuthProvider();
        result = await signInWithPopup(auth, googleProvider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGithub() {
    let result = null,
        error = null;

    try {
        const githubProvider = new GithubAuthProvider();
        result = await signInWithPopup(auth, githubProvider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
