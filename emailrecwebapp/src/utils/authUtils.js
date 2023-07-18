import { auth } from './firebase';

export function checkAuthStatus() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject('User not logged in!')
            }
        })
    })
}
