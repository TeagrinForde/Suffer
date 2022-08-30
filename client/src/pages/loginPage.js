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
        const loginBtn = document.getElementById('login');
        const signupBtn = document.getElementById('signUp');
        loginBtn.classList.remove('focus');
        signupBtn.classList.remove('focus');
        // add appropriate focus
        const fcsBtn = document.getElementById(tab);
        fcsBtn.classList.add('focus');
    }, [tab]);

    return (
        <div className="container" class="align-middle" id='loginContainer'>
            <div >
                <button id="login" onClick={() => setTab('login')}>Login</button>
                <button id="signUp" onClick={() => setTab('signUp')}>Sign Up</button>
            </div>
            {switchTab(tab)}
        </div>
    )
}

export default LoginPage;