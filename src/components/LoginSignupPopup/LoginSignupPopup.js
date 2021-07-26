import React, { useEffect, useState } from 'react';
import './loginSignupPopup.scss';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function LoginSignupPopup() {
    const [status, setStatus] = useState('login');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [nameSignup, setNameSignup] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [confirm_passwordSignup, setConfirm_passwordSignup] = useState('');

    const login = () => {
        axios({
            method: "POST",
            withCredentials: true,
            mode: 'no-cors',
            url: `http://localhost:8069/frontend/login`,
            params: {
                login: emailLogin,
                password: passwordLogin
            },
            headers: {
                'Content-Type': 'application/text;text/plain;charset=utf-8',
            },
        }).then(value => {
            if (value.data.loginSuccess)
                window.location.reload();
            else
                alert('Wrong User Name Or Password!');
        }, error => console.log(error));
    };

    const signup = () => {
        axios({
            method: "POST",
            withCredentials: true,
            mode: 'no-cors',
            url: `http://localhost:8069/frontend/signup`,
            params: {
                name: nameSignup,
                login: emailSignup,
                password: passwordSignup,
                confirm_password: confirm_passwordSignup
            },
            headers: {
                'Content-Type': 'application/text;text/plain;charset=utf-8',
            },
        }).then(value => {
            if (value.data.status && value.data.status === "success")
                window.location.reload();
            else
                alert(value.data.message);
        }, error => console.log(error));
    };

    const resetPassword = () => console.log('resetPassword');

    return (
        <div className="modal fade" role="dialog" id="LoginSignupModal" aria-hidden="true" >
            <div className="modal-dialog">
                {status === 'login' && <div className="modal-content">
                    <div className="modal-header">
                        <h3>Login</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" placeholder="Enter Email" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input type="password" className="form-control" placeholder="Enter Password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
                            </div>
                            <div class="mt-3 mb-3 dont_have_an_account">
                                <a onClick={() => setStatus('signup')}>Don't have an account?</a>
                                <a onClick={() => setStatus('resetpassword')}>Reset Password</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-modal p-3">
                        <a className="btn btn-dark w-100 ms-2" onClick={() => login()}>Login</a>
                    </div>
                </div>}
                {status === 'signup' && <div className="modal-content">
                    <div className="modal-header">
                        <h3>Sign Up</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group">
                                <label for="exampleInputEmail1">Your Email</label>
                                <input type="email" className="form-control" value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Your Name</label>
                                <input type="text" className="form-control" value={nameSignup} onChange={(e) => setNameSignup(e.target.value)} placeholder="Enter Your Name" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input type="password" className="form-control" value={passwordSignup} onChange={(e) => setPasswordSignup(e.target.value)} placeholder="Enter Password" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Confirm Password</label>
                                <input type="password" className="form-control" value={confirm_passwordSignup} onChange={(e) => setConfirm_passwordSignup(e.target.value)} placeholder="Enter Confirm Password" />
                            </div>
                            <div class="mt-3 mb-3 dont_have_an_account">
                                <a onClick={() => setStatus('login')}>Already have an account?</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-modal p-3">
                        <a className="btn btn-dark w-100 ms-2" onClick={() => signup()}>Sign Up</a>
                    </div>
                </div>}
                {status === 'resetpassword' && <div className="modal-content">
                    <div className="modal-header">
                        <h3>Reset Password</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter " />
                            </div>
                            <div class="mt-3 mb-3 dont_have_an_account">
                                <a onClick={() => setStatus('login')}>Back To Login</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-modal p-3">
                        <a className="btn btn-dark w-100 ms-2" onClick={() => resetPassword()}>Confirm</a>
                    </div>
                </div>}
            </div>
        </div>
    );
}
export default LoginSignupPopup;