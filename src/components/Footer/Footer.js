import React from 'react';
import './footer.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Footer() {

  return (
    <footer className="container">
      <div className="border-top border-dark main-footer">
        <div>
          <Link to="/facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Link>
          <Link to="/insta">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 11.3701C16.1234 12.2023 15.9813 13.0523 15.5938 13.7991C15.2063 14.5459 14.5931 15.1515 13.8416 15.5297C13.0901 15.908 12.2384 16.0397 11.4078 15.906C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1903 8.22773 13.4229 8.09406 12.5923C7.9604 11.7616 8.09206 10.91 8.47032 10.1584C8.84858 9.40691 9.45418 8.7938 10.201 8.4063C10.9478 8.0188 11.7978 7.87665 12.63 8.00006C13.4789 8.12594 14.2648 8.52152 14.8717 9.12836C15.4785 9.73521 15.8741 10.5211 16 11.3701Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.5 6.5H17.51" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Link>
          <Link to="/insta">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 6L12 13L2 6" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="border-top border-dark main-footer">
        <div>© 2021 Habiba Kitchen</div>
        <div>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          {/* <Link to="/privacy-policy">Privacy Policy</Link> */}
          <Link to="/about-us">About us</Link>
        </div>
      </div>

    </footer>
  );
}
export default Footer;