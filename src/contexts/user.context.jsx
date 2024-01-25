import {
    createContext,
    useState,
    useEffect
}
    from 'react'
import { onAuthStateChangedListener, getIdTokenResult } from '../utils/firebase/firebase.utils';
// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const value = { currentUser, setCurrentUser };
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                const idTokenResult = await getIdTokenResult(user);
                console.log(`idTokenResult : ${idTokenResult.claims?.role ?? 'guest123'}`);
                setCurrentUser({
                    ...user,
                    role: idTokenResult.claims?.role ?? 'guest'
                });
            } else {
                setCurrentUser(null);
            }

        })
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}