import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'


const Header = ({ loggedIn, setLoggedIn, total }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setLoggedIn(true)
        }
    }, [])

    const logOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('accessToken');
        navigate('/login')
    }


    return (
        <div className="navbar bg-base-200 shadow">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Billing System</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {
                        loggedIn === true ? <>
                            <li><button className="btn btn-ghost text-center font-bold mr-10">Paid Total: ${total.toFixed(2)} </button></li>
                            <li><button onClick={logOut} className='btn btn-ghost capitalize  text-center'>Sign Out</button></li>
                        </>
                            :
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/registration">Register</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;