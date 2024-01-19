import {
    createContext,
    useState,
    useEffect
}
    from 'react'
import { onAuthStateChangedListener, createUserUsingBackendApi } from '../utils/firebase/firebase.utils';
import { checkIfMenteeExists } from '../utils/firebase/connect-api.utils';
// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}