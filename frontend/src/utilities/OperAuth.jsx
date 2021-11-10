import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, signOut } from "@firebase/auth";

import { auth } from "../services/Firebase";

async function funcCreateAuthMailPassword(username, email, password) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCred.user, {
        displayName: username
    });
}

async function funcSignAuthMailPassword(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
}

async function funcSignAuthGoogle(){
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
}

async function funcSignOut() {
    await signOut(auth)
}

export {
    funcCreateAuthMailPassword,
    funcSignAuthMailPassword,
    funcSignAuthGoogle,
    funcSignOut
}