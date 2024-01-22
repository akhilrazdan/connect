import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CrwnLogo from '../../assets/BatonnageLogo_Orange_Mentorship.png';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext)

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <img src={CrwnLogo} alt="Logo" className="logo-image" />
                </Link>
                <div className="nav-links-container">
                    {currentUser ? currentUser.email : ""}
                    <Link className="nav-link" to='/my-learning'>
                        MY REQUESTS
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                    ) : (<Link className="nav-link" to='/auth'>
                        SIGN IN
                    </Link>)}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;