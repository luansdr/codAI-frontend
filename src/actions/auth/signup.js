import firebase_app from "../../firebase/config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, password, firstName, lastName) {
    let result = null,
        error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);

        await new Promise((resolve, reject) => {
            updateProfile(result.user, {
                displayName: `${firstName} ${lastName}`,
            })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}
