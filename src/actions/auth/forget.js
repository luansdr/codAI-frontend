import firebase_app from "../../firebase/config";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function forgetPassowrdFirebase(email, password) {
    let result = null,
        error = null;
    try {
        result = await sendPasswordResetEmail(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
