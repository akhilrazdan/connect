import { getIdTokenResult } from "./firebase.utils";
import {
    getIdTokenBearer
} from './firebase.utils'

const BACKEND_URL = process.env.REACT_APP_CONNECT_API_ENDPOINT;

export const createUser = async ({ name, email }) => {
    try {
        const idToken = await getIdTokenBearer();
        console.log(`Calling createMentee ${idToken} ${name} ${email}`);
        const response = await fetch(`${BACKEND_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` // Include the ID token in the request headers
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        if (response.ok) {
            // The request was successful, and the user was created
            const createdUser = await response.json();
            return { error: false, user: createdUser };
        } else {
            // The request was unsuccessful, log the status and return an error object
            console.error('Failed to create user. Status:', response.status);
            const errorData = await response.json();
            throw Error(errorData)
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred while creating the user:', error);
        throw Error(error.message)

    }
};
export const getUser = async ({ }) => {
    console.log(`Backend : ${BACKEND_URL}`)
    try {
        const idToken = await getIdTokenBearer();
        const response = await fetch(`${BACKEND_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${idToken}` // Include the ID token in the request headers
            }
        });
        console.log(`Calling getUser ${idToken} ${response.ok}`);
        if (response.ok) {
            // The request was successful, and the user exists
            const userDetails = await response.json()
            console.log(`response userDetails ${JSON.stringify(userDetails)}`)
            return userDetails;
        } else if (response.status === 404) {
            // The request was unsuccessful, and the user does not exist
            const errorData = await response.json();
            console.error(`AKhilz response ${JSON.stringify(errorData)}`)
            return null;
        } else {
            // Handle other potential status codes (e.g., server errors)
            console.error('Received unexpected status code:', response.status);
            return null;
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred while checking if user exists:', error);
        throw error;
    }
};
// TODO(akhilz) Move to connect api 
export const createUserUsingBackendApi = async (userAuth, additionalInformation = {}) => {

    try {
        await setUserClaims()
        const displayName = additionalInformation.displayName || userAuth.displayName;
        const email = userAuth.email;
        console.log(`Creating user account with ${userAuth.email}`)
        // If user does not exist, proceed with creating the user
        const userDetails = await getUser({});
        if (!userDetails) {
            console.log(`User details do not exist ${email} ${displayName}`)
            const response = await createUser({ name: displayName, email })
            return response;
        }
    } catch (error) {
        console.error('Error in creating the mentee using backend API:', error)
        throw error; // rethrow the error if you want to handle it outside this function
    }
};

export const setUserClaims = async () => {
    try {
        const idToken = await getIdTokenBearer();
        const response = await fetch(`${BACKEND_URL}/userclaims`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` // Include the ID token in the request headers
            }
        });
        const refreshIdToken = await getIdTokenResult(true)
        if (response.ok) {
            // The request was successful, and the user exists
            return true;
        } else if (response.status === 404) {
            // The request was unsuccessful, and the user does not exist
            return false;
        } else {
            // Handle other potential status codes (e.g., server errors)
            console.error('Received unexpected status code:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error in creating the mentee using backend API:', error)
        throw error; // rethrow the error if you want to handle it outside this function
    }
}

export const isUserAllowListed = async () => {
    try {
        const idToken = await getIdTokenBearer();
        const response = await fetch(`${BACKEND_URL}/allowed`, {
            headers: {
                'Authorization': `Bearer ${idToken}` // Include the ID token in the request headers
            }
        });
        if (response.ok) {
            // The request was successful, and the user exists
            return true;
        } else if (response.status === 404) {
            console.log(`isUserAllowListed : ${response.status}`)
            // The request was unsuccessful, and the user does not exist
            return false;
        } else {
            // Handle other potential status codes (e.g., server errors)
            console.error('Received unexpected status code:', response.status);
            return false;
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred while checking if user exists:', error);
        return false;
    }
};

export const getMentorsForMentee = async ({ }) => {
    try {
        const idToken = await getIdTokenBearer();
        const response = await fetch(`${BACKEND_URL}/mentors`, {
            headers: {
                'Authorization': `Bearer ${idToken}` // Include the ID token in the request headers
            }
        });
        if (response.ok) {
            // The request was successful, and the user exists
            const mentors = await response.json()
            return mentors;
        } else if (response.status === 404) {
            // The request was unsuccessful, and the user does not exist

            const errorData = await response.json();
            console.error(`Akhilz response ${JSON.stringify(errorData)}`)
            return null;
        } else {
            // Handle other potential status codes (e.g., server errors)
            console.error('Received unexpected status code:', response.status);
            return null;
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred while checking if user exists:', error);
        throw error;
    }
};

export const signupMenteeForMentor = async ({ mentorId }) => {
    const url = `${BACKEND_URL}/signup`; // Adjust the URL to your backend endpoint
    try {
        const idToken = await getIdTokenBearer();
        console.log(`Calling signupMenteeForMentor ${idToken} ${mentorId}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` // Include the ID token in the request headers
            },
            body: JSON.stringify({ idToken, mentorId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const result = await response.json();
        return result; // This could be the confirmation message or details about the signup
    } catch (error) {
        throw error; // Rethrow the error so you can handle it in the component
    }
};