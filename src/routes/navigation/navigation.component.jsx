import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CrwnLogo from '../../assets/BatonnageLogo_Orange_Mentorship.png';

import './navigation.styles.scss';
import { UnifiedUserContext } from "../../contexts/unified-user.context";

const Navigation = () => {
    const { currentUser, role } = useContext(UnifiedUserContext)

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
                    Hi {currentUser ? currentUser.email : ""}
                    <Link className="nav-link" to='/faq'>
                        FAQ
                    </Link>
                    <Link className="nav-link" to='/my-learning'>
                        MY LEARNING
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