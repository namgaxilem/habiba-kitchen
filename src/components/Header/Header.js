import React, { useEffect, useState } from 'react';
import './header.scss';
import logo from './assets/logo.png';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../store/userStore';

function Header() {
    const [totalCartQuantity, setTotalCartQuantity] = useState(0);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const user = useSelector(state => state.user);

    useEffect(() => {
        axios.get('http://localhost:8069/frontend/check_login', {
            method: 'GET',
            mode: 'no-cors',
            withCredentials: true,
        }).then(result => {
            console.log('check_login', result.data);
            dispatch(updateUser(result.data));
        }, (error) => {
            console.log("error", error);
        });
    }, []);

    useEffect(() => {
        let sum = 0;
        cartItems.map(item => sum += item.quantity);
        setTotalCartQuantity(sum);
    }, [cartItems]);

    const logout = () => {
        axios({
            method: "GET",
            withCredentials: true,
            mode: 'no-cors',
            url: `http://localhost:8069/frontend/logout`,
        }).then(
            () => window.location.reload(),
            error => console.log(error)
        )
    }

    const myAccout = () => {
        console.log('myAccout');

    }

    return (
        <header className="main_page_header container bg-white">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <Link className="navbar-brand header-logo-img" to="/">
                    <img src={logo} alt="Logo" />
                    <span>Habiba Kitchen</span>
                </Link>
                <div className="header-btn-left">
                    <svg width="27px" height="27px" viewBox="0 0 27 20">
                        <g transform="translate(-6 -10)" fill="none">
                            <rect width="39" height="39" rx="5"></rect>
                            <path d="M31.31 26.667a1.5 1.5 0 1 1 0 3H7.5a1.5 1.5 0 0 1 0-3h23.81zM7.5 13a1.5 1.5 0 1 1 0-3h23.81a1.5 1.5 0 0 1 0 3H7.5zm23.81 5.334a1.5 1.5 0 1 1 0 3H7.5a1.5 1.5 0 0 1 0-3h23.81z" fill="#000000"></path>
                        </g>
                    </svg>
                </div>
                <a className="header-btn-right cart_button" data-bs-toggle="modal" data-bs-target="#myCart">
                    <svg width="27px" height="27px" viewBox="0 0 29 36">
                        <title>ShoppingBag</title>
                        <path d="M14.549 1a6.563 6.563 0 0 0-6.557 6.557v.159H3.657a.689.689 0 0 0-.683.62L1 30.61C1 33.06 3.202 35 5.914 35H23.19c2.713 0 4.915-1.94 4.915-4.327L26.124 8.337a.683.683 0 0 0-.683-.621h-4.335v-.159A6.563 6.563 0 0 0 14.549 1zm-5.19 6.557a5.193 5.193 0 0 1 5.19-5.19 5.193 5.193 0 0 1 5.19 5.19v.159H9.36v-.159zm15.454 1.525L26.73 30.7c-.02 1.622-1.601 2.933-3.547 2.933H5.914c-1.946 0-3.527-1.311-3.547-2.933L4.285 9.082h3.707v3.162c0 .38.304.683.683.683a.68.68 0 0 0 .683-.683V9.082H19.74v3.162c0 .38.304.683.684.683a.68.68 0 0 0 .683-.683V9.082h3.707z" fill="#000000" stroke="#000000"></path>
                    </svg>
                    <span className="cart_quantity">{totalCartQuantity}</span>
                </a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar navbar-nav">
                        <Link className="nav-item nav-link" to="/">Home</Link>
                        <Link className="nav-item nav-link" to="/menu">Menu</Link>
                        <Link className="nav-item nav-link" to="/about-us">About</Link>
                        <a className="nav-item nav-link">
                            {
                                (user.length > 0 && user[0].isLogin !== null) ?
                                    (<div class="btn-group">
                                        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user[0].name}
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/my-account">My Account</Link></li>
                                            <li><a class="dropdown-item" onClick={() => console.log('My orders')}>My orders</a></li>
                                            <li><a class="dropdown-item" onClick={() => console.log('Change password')}>Change password</a></li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li><a class="dropdown-item" onClick={() => logout()}>Logout</a></li>
                                        </ul>
                                    </div>) :
                                    (<button className="login-signup-btn rounded border-0" data-bs-toggle="modal" data-bs-target="#LoginSignupModal">Login/Sign up</button>)
                            }
                        </a>
                        <a className="cart_button" data-bs-toggle="modal" data-bs-target="#myCart">
                            <svg width="27px" height="27px" viewBox="0 0 29 36">
                                <title>ShoppingBag</title>
                                <path d="M14.549 1a6.563 6.563 0 0 0-6.557 6.557v.159H3.657a.689.689 0 0 0-.683.62L1 30.61C1 33.06 3.202 35 5.914 35H23.19c2.713 0 4.915-1.94 4.915-4.327L26.124 8.337a.683.683 0 0 0-.683-.621h-4.335v-.159A6.563 6.563 0 0 0 14.549 1zm-5.19 6.557a5.193 5.193 0 0 1 5.19-5.19 5.193 5.193 0 0 1 5.19 5.19v.159H9.36v-.159zm15.454 1.525L26.73 30.7c-.02 1.622-1.601 2.933-3.547 2.933H5.914c-1.946 0-3.527-1.311-3.547-2.933L4.285 9.082h3.707v3.162c0 .38.304.683.683.683a.68.68 0 0 0 .683-.683V9.082H19.74v3.162c0 .38.304.683.684.683a.68.68 0 0 0 .683-.683V9.082h3.707z" fill="#000000" stroke="#000000"></path>
                            </svg>
                            <span className="cart_quantity">{totalCartQuantity}</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;