import axios, { Axios } from "axios";

const API_KEY = "AIzaSyCTOsWnKQw19PJbqhzcTuf0dFZC81yZF44";

export async function authenticate (mode, email, password) {
    const authurl = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

    const response = await axios.post(
        authurl,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );
    const token = response.data.idToken;
    return token;
}

export function createUser(email, password) {
    return authenticate("signUp", email, password);
}

export function signin(email, password) {
    return authenticate("signInWithPassword", email, password);
}