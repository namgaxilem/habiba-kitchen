import React, { useState, useEffect } from 'react';
import QuantityInput from '../QuantityInput/QuantityInput';
import './cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateCart, removeCartItem } from '../../store/cartStore';
import axios from 'axios';

function Cart() {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();
    const [totalCartQuantity, setTotalCartQuantity] = useState(0);
    const [subTotalCart, setSubTotalCart] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');
    const [delivery_current, setDelivery_current] = useState({
        "current_selected_partner_id": 0,
        "partner_id": 0,
        "name": "",
        "display_name": "",
        "phone": "",
        "contact_address": "",
        "city": "",
        "country": "",
        "state": "",
        "email": ""
    });
    const [delivery_list, setDelivery_list] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8069/frontend/get_delivery_addresses', {
            method: 'GET',
            mode: 'no-cors',
            withCredentials: true,
        }).then(result => {
            // add all to cart
            console.log('get_delivery_addresses', result.data);
            setDelivery_list(result.data);
        }, (error) => {
            console.log("error", error);
        });
    }, []);

    useEffect(() => {
        let sumQuantity = 0;
        let sumSubTotal = 0;
        cartItems.map(item => {
            sumQuantity += item.quantity;
            sumSubTotal += item.quantity * item.list_price;
        });
        setTotalCartQuantity(sumQuantity);
        setSubTotalCart(sumSubTotal);
    }, [cartItems]);

    const CartItem = ({ cartItem }) => (
        < div className="cart_product_item mb-3" >
            <div className="">
                <img className="cart_product_item_image" src={`http://localhost:8069/web/image/product.template/${cartItem.id}/image_1024/`} alt="Logo" />
            </div>
            <div className="w-100 p-1">
                <div className="cart_product_item_name">
                    <h6>{cartItem.name}</h6>
                    <svg onClick={() => remove_cart_item(cartItem.id)} width="16" height="22" viewBox="0 0 16 22" fill="none">
                        <path d="M4 5V3C4 2.46957 4.21071 1.96086 4.58579 1.58579C4.96086 1.21071 5.46957 1 6 1H10C10.5304 1 11.0391 1.21071 11.4142 1.58579C11.7893 1.96086 12 2.46957 12 3V5M15 5V19C15 19.5304 14.7893 20.0391 14.4142 20.4142C14.0391 20.7893 13.5304 21 13 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5H15Z" stroke="#9B350A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="cart_product_item_quantity">
                    <QuantityInput parentState={cartItem.quantity} changeParentState={quantity => dispatch(updateCart({ id: cartItem.id, quantity }))} />
                    <div className="cart_item_total_value">{cartItem.list_price * cartItem.quantity}</div>
                </div>
            </div>
        </div >
    );

    const clear_cart = () => dispatch(clearCart());

    const remove_cart_item = id => dispatch(removeCartItem(id));

    const checkOut = () => {
        axios.post('http://localhost:8069/frontend/cart/update_json', {
            method: 'POST',
            mode: 'no-cors',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(result => {
            console.log(result.data);
        }, (error) => {
            console.log("error", error);
        });

    };

    return (
        <div id="myCart" className="modal fade right" role="dialog" aria-hidden="true">
            <div class="modal-dialog sidecart" role="document">
                <div class="modal-content">
                    <header className="cart-header">
                        <p className="your-cart">Your Cart ({totalCartQuantity})</p>
                        <a className="close-cart-btn" data-bs-dismiss="modal">
                            <svg width="18px" height="18px" viewBox="0 0 26 27" >
                                <defs>
                                    <rect width="39" height="39" rx="5"></rect>
                                </defs>
                                <g transform="translate(-6 -6)" fill="none">
                                    <g transform="rotate(135 17.586 18.914)">
                                        <rect fill="#000000" y="15.448" width="34" height="4" rx="2"></rect>
                                        <rect fill="#000000" transform="rotate(90 17 17.448)" y="15.448" width="34" height="4" rx="2"></rect>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </header>

                    <div className="cart_contents">
                        <form className="container p-3">
                            <legend className="cart_form_legend">
                                <h4 className="">Item(s) Added: </h4>
                                <a className="clear_cart_items" onClick={() => clear_cart()}>Clear Items </a>
                            </legend>

                            {cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}

                            <div className="cart_sub_total mt-4">
                                <h5>Subtotal:</h5>
                                <h5 className="cart_sub_total_value">{subTotalCart}</h5>
                            </div>

                            <legend className="cart_form_legend mt-5">
                                <h4 className="">Delivery:</h4>
                            </legend>
                            <div className="cart_delivery_options">
                                <div className={"p-3 " + (deliveryMethod === 'delivery' ? 'border border-danger' : '')}>
                                    <div className="cart_delivery_option" onClick={() => setDeliveryMethod('delivery')}>
                                        {deliveryMethod === 'delivery' ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#9B350A" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M22 4L12 14.01L9 11.01" stroke="#9B350A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>)}
                                        <span class="ms-2">Delivery</span>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Name</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter " />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Phone</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">City</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Country</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                </div>

                                <div className={"p-3 " + (deliveryMethod === 'pickup' ? 'border border-danger' : '')}>
                                    <div className="cart_delivery_option" onClick={() => setDeliveryMethod('pickup')}>
                                        {deliveryMethod === 'pickup' ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#9B350A" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M22 4L12 14.01L9 11.01" stroke="#9B350A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>)}
                                        <span class="ms-2">Pickup</span>
                                    </div>
                                </div>
                            </div>

                            <legend className="cart_form_legend mt-5">
                                <h4 className="">Payment:</h4>
                            </legend>
                            <div className="cart_payment_options">
                                <div className={"p-3 " + (paymentMethod === 'cash' ? 'border border-danger' : '')}>
                                    <div className="cart_payment_option" onClick={() => setPaymentMethod('cash')}>
                                        {paymentMethod === 'cash' ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#9B350A" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M22 4L12 14.01L9 11.01" stroke="#9B350A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>)}
                                        <span class="ms-2">Cash</span>
                                        <svg class="ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M23.0625 4.30405H0.9375C0.419719 4.30405 0 4.72377 0 5.24155V18.7584C0 19.2762 0.419719 19.6959 0.9375 19.6959H23.0625C23.5803 19.6959 24 19.2762 24 18.7584V5.24155C24 4.72377 23.5803 4.30405 23.0625 4.30405ZM22.2436 15.128C22.2436 15.5165 21.9291 15.8311 21.5405 15.8311C20.7656 15.8311 20.1352 16.4615 20.1352 17.2364C20.1352 17.625 19.8206 17.9395 19.432 17.9395H4.56797C4.17937 17.9395 3.86484 17.625 3.86484 17.2364C3.86484 16.4615 3.23438 15.8311 2.45953 15.8311C2.07094 15.8311 1.75641 15.5165 1.75641 15.128V8.87202C1.75641 8.48342 2.07094 8.16889 2.45953 8.16889C3.23438 8.16889 3.86484 7.53842 3.86484 6.76358C3.86484 6.37498 4.17937 6.06045 4.56797 6.06045H19.432C19.8206 6.06045 20.1352 6.37498 20.1352 6.76358C20.1352 7.53842 20.7656 8.16889 21.5405 8.16889C21.9291 8.16889 22.2436 8.48342 22.2436 8.87202V15.128Z" fill="#727070" />
                                            <path d="M18.8179 7.46671H5.18197C4.92697 8.45295 4.14885 9.23108 3.1626 9.48608V14.5139C4.14885 14.7689 4.92697 15.547 5.18197 16.5333H18.8179C19.0729 15.547 19.851 14.7689 20.8373 14.5139V9.48608C19.851 9.23108 19.0729 8.45295 18.8179 7.46671ZM6.77291 12.7031H5.99994C5.61135 12.7031 5.29682 12.3881 5.29682 12C5.29682 11.6119 5.61135 11.2969 5.99994 11.2969H6.77291C7.16104 11.2969 7.47604 11.6119 7.47604 12C7.47604 12.3881 7.16104 12.7031 6.77291 12.7031ZM11.9999 14.6269C10.5515 14.6269 9.37307 13.4484 9.37307 12C9.37307 10.5515 10.5515 9.37311 11.9999 9.37311C13.4484 9.37311 14.6268 10.5515 14.6268 12C14.6268 13.4484 13.4484 14.6269 11.9999 14.6269ZM17.9999 12.7031H17.227C16.8388 12.7031 16.5238 12.3881 16.5238 12C16.5238 11.6119 16.8388 11.2969 17.227 11.2969H17.9999C18.3885 11.2969 18.7031 11.6119 18.7031 12C18.7031 12.3881 18.3885 12.7031 17.9999 12.7031Z" fill="#727070" />
                                            <path d="M11.9999 13.2206C12.674 13.2206 13.2205 12.6741 13.2205 12C13.2205 11.3258 12.674 10.7794 11.9999 10.7794C11.3258 10.7794 10.7793 11.3258 10.7793 12C10.7793 12.6741 11.3258 13.2206 11.9999 13.2206Z" fill="#727070" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={"p-3 " + (paymentMethod === 'paypal' ? 'border border-danger' : '')}>
                                    <div className="cart_payment_option" onClick={() => setPaymentMethod('paypal')}>
                                        {paymentMethod === 'paypal' ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#9B350A" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M22 4L12 14.01L9 11.01" stroke="#9B350A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>)}
                                        <span class="ms-2">Paypal</span>
                                        <svg class="ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20.5739 5.99268V6.09668C20.5739 9.41638 19.0411 11.3331 17.7553 12.3565C16.3355 13.4866 14.4495 14.1346 12.5809 14.1346H9.28027C9.229 14.1346 9.11511 14.1346 9.034 14.1436C9.02301 14.1802 9.01037 14.2343 8.99994 14.3099C8.99719 14.3311 8.99371 14.3522 8.99005 14.3732L7.935 20.1888C7.74676 21.226 6.84588 21.9787 5.79266 21.9787H5.59125L5.51837 22.455C5.45923 22.8428 5.57165 23.2355 5.82709 23.5329C6.08197 23.8299 6.45257 24 6.8435 24H9.39966C10.0482 24 10.6028 23.5364 10.7186 22.8979L11.6456 17.7878C11.6475 17.7777 11.6491 17.7675 11.6504 17.7572C11.7348 17.1367 11.9875 17.1077 12.4641 17.1077H15.3641C16.879 17.1077 18.4061 16.5837 19.5541 15.67C20.5854 14.8493 21.8148 13.3065 21.8148 10.6177V9.08057C21.8149 7.85284 21.3566 6.78296 20.5739 5.99268Z" fill="#727070" />
                                            <path d="M6.50826 19.9299L7.56331 14.1143C7.75393 12.7121 8.74032 12.6844 9.28029 12.6844H12.581C15.2475 12.6844 19.1239 10.9801 19.1239 6.09649V4.34729C19.1239 1.6745 16.9422 0 14.2756 0H9.28029C5.4543 0.046875 5.16353 -0.0261841 4.43203 4.85943L2.16482 19.6891C2.09725 20.1306 2.43801 20.5285 2.88369 20.5285H5.79268C6.14425 20.5285 6.44546 20.2765 6.50826 19.9299Z" fill="#727070" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <footer className="cart_footer p-2">
                        <div className="cart_total mb-1">
                            <span>Subtotal:</span>
                            <span className="cart_sub_total_value">{subTotalCart}</span>
                        </div>
                        <button onClick={() => checkOut()}>Check out</button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
export default Cart;