const BACKEND_URL = process.env.REACT_APP_CONNECT_API_ENDPOINT;

export const createMentee = async ({ uid, name, email }) => {
    try {
        console.log(`Calling createMentee ${uid} ${name} ${email}`);
        const response = await fetch(`${BACKEND_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid,
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
            return { error: true, status: response.status, data: errorData };
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred while creating the user:', error);
        return { error: true, message: error.message };
    }
};
export const getMentee = async ({ uid }) => {
    console.log(`Backend : ${BACKEND_URL}`)
    try {
        const response = await fetch(`${BACKEND_URL}/user/${uid}`);
        console.log(`Calling getMentee ${uid} ${response.ok}`);
        if (response.ok) {
            // The request was successful, and the user exists
            const userMetadata = await response.json()
            console.log(`response userMetadata ${JSON.stringify(userMetadata)}`)
            return userMetadata;
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

export const checkIfMenteeExists = async ({ uid }) => {
    try {
        const response = await fetch(`${BACKEND_URL}/user/${uid}`);
        console.log(`Calling checkIfMenteeExists ${uid} ${response.ok}`);
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
        // Handle network or other unexpected errors
        console.error('An error occurred while checking if user exists:', error);
        return false;
    }
};

export const getMentorsForMentee = async ({ uid }) => {
    try {
        const response = await fetch(`${BACKEND_URL}/mentors?menteeId=${uid}`);
        console.log(`Getting mentors for mentee real ${uid} ${response.ok}`);
        if (response.ok) {
            // The request was successful, and the user exists
            const mentors = await response.json()
            return mentors;
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

export const signupMenteeForMentor = async ({ menteeId, mentorId }) => {
    const url = `${BACKEND_URL}/signup`; // Adjust the URL to your backend endpoint
    console.log(`Calling signupMenteeForMentor ${menteeId} ${mentorId}`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ menteeId, mentorId }),
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