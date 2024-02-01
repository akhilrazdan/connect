import { Outlet, NavLink, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CrwnLogo from '../../assets/BatonnageLogo_Orange_Mentorship.png';

import './navigation.styles.scss';
import { UnifiedUserContext } from "../../contexts/unified-user.context";

const Navigation = () => {
    const { currentUser } = useContext(UnifiedUserContext)

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">

                <div className="nav-links-container">
                    <div className="left-nav-links">
                        <Link className="logo-container" to='/'>
                            <img src={CrwnLogo} alt="Logo" className="logo-image" />
                        </Link>
                        <NavLink to='/' className="nav-link home" activeClassName="active-link">
                            Home
                        </NavLink>
                        <NavLink to='/faq' className="nav-link faq" activeClassName="active" >
                            FAQ
                        </NavLink>
                    </div>
                    <div className="right-nav-links">
                        <span >Hi {currentUser ? currentUser.email : ""}</span>
                        {currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                        ) : (<NavLink className="nav-link" to='/auth'>
                            SIGN IN
                        </NavLink>)}
                    </div>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;