import React, { useState } from 'react';
import './productDetailPopup.scss';
import QuantityInput from '../QuantityInput/QuantityInput';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartStore';

function ProductDetailPopup(props) {
    const dispatch = useDispatch();
    const { product } = props;
    const [quantity, setQuantity] = useState(1);

    const add_to_cart = () => dispatch(addToCart({ product, quantity }));

    return (
        <div className="modal fade" role="dialog" id="ProductModal" aria-hidden="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-4 product_image">
                                <img src={`http://localhost:8069/web/image/product.template/${product.id}/image_1024/`} />
                            </div>
                            <div className="col-8 product_description">
                                <h5>{product.name}</h5>
                                <p>{product.description}</p>
                                <p>{product.list_price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-modal p-3">
                        <QuantityInput changeParentState={state => setQuantity(state)} parentState={quantity} />
                        <a className="btn btn-dark w-100 ms-2" onClick={() => add_to_cart()}>Add To Cart</a>
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        {/* <button type="button" className="btn btn-primary">Understood</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetailPopup;