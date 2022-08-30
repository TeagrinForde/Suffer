import React, { useState, useEffect } from 'react';
import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
    
function switchTab(tab) {
    switch (tab) {
        case 'signUp':
            return <Signup/>
        default:
            return <Login/>
    };
}

function LoginPage() {
    const [tab, setTab] = useState('login');

    useEffect(() => {
        // clear focus
        const loginBtn = document.getElementById('btnLogin');
        const signupBtn = document.getElementById('btnSignup');
        loginBtn.classList.remove('focus');
        signupBtn.classList.remove('focus');
        // // add appropriate focus
        // const fcsBtn = document.getElementById('');
        // fcsBtn.classList.add('focus');
    }, [tab]);

    return (
        <div className="container">
            <div>
                <button id="btnLogin" onClick={() => setTab('login')}>Login</button>
                <button id="btnSignup" onClick={() => setTab('signUp')}>Sign Up</button>
            </div>
            {switchTab(tab)}
        </div>
    )
}

export default LoginPage;