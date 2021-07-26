import React from 'react';
import './product.scss';

function Product(props) {
  const { product, setProductSelected } = props;

  return (
    <div action="/shop/cart/update" method="post" className="col-sm-6 col-lg-3 dish-container" data-bs-toggle="modal" data-bs-target="#ProductModal" onClick={() => setProductSelected()}>
      <div className="pt-2 pb-2">
        <div className="border dish-container-border">
          <a t-att-href="product_href" className="dish-image-container">
            <img src={`http://localhost:8069/web/image/product.template/${product.id}/image_1024/`} />
          </a>
          <div className="p-2">
            <h6 className="dish-title">
              {product.name}
            </h6>
            <div className="dish-price">
              {product.list_price}
            </div>
            <button className="add-to-cart-btn rounded border-0">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;