
export const createMentee = async ({ uid, name, email }) => {
    try {
        console.log(`Calling createMentee ${uid} ${name} ${email}`);
        const response = await fetch(`http://localhost:3000/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uid,
                name,
                email
            })
        });

        if (response.ok) {
            // The request was successful, and the user was created
            const createdUser = await response.json();
            return createdUser;
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
    try {
        const response = await fetch(`http://localhost:3000/user/${uid}`);
        console.log(`Calling checkIfMenteeExists ${uid} ${response.ok}`);
        if (response.ok) {
            // The request was successful, and the user exists
            return response;
        } else if (response.status === 400) {
            // The request was unsuccessful, and the user does not exist
            return response;
        } else {
            // Handle other potential status codes (e.g., server errors)
            console.error('Received unexpected status code:', response.status);
            return response;
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred while checking if user exists:', error);
        throw error;
    }
};

export const checkIfMenteeExists = async ({ uid }) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${uid}`);
        console.log(`Calling checkIfMenteeExists ${uid} ${response.ok}`);
        if (response.ok) {
            // The request was successful, and the user exists
            return true;
        } else if (response.status === 400) {
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


// const createUserResponse = await fetch(`${process.env.REACT_APP_BACKEND || "http://localhost:3000"}/register`, {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 email,
//                 displayName,
//                 createdAt,
//                 ...additionalInformation
//             })
//         });

//         const newUser = await createUserResponse.json();

//         if (newUser.id) {
//             // Handle successful user creation
//             return newUser;
//         } else {
//             // Handle errors or unsuccessful user creation
//             throw new Error(newUser);
//         }