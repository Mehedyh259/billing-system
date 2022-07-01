import React from 'react';
import Header from './Header';

const Layout = ({ children, loggedIn, setLoggedIn, total }) => {
    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} total={total} />
            {children}
        </div>
    );
};

export default Layout;