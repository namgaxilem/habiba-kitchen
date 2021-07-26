import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './productPage.scss';
import ProductDetailPopup from '../ProductDetailPopup/ProductDetailPopup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartStore';

function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState({})
  const [fixedCategoryBar, setFixedCategoryBar] = useState(false);
  const [currentCategory_product_scroll, setCurrentCategory_product_scroll] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8069/frontend/get_product', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/text',
      },
    }).then(result => {
      setCategories(result.data.categories);
      setProducts(result.data.products);
    }, (error) => {
      console.log("error", error);
    });

    axios.get('http://localhost:8069/frontend/get_cart', {
      method: 'GET',
      mode: 'no-cors',
      withCredentials: true,
    }).then(result => {
      // add all to cart
      for (let i = 0; i < result.data.length; i++) {
        const product = {
          id: result.data[i].product_id,
          name: result.data[i].product_name,
          list_price: Number(result.data[i].product_price)
        };
        const quantity = result.data[i].product_qty;
        dispatch(addToCart({ product, quantity }));
      }
    }, (error) => {
      console.log("error", error);
    });

    window.addEventListener('scroll', onUserScroll)
    return () => {
      window.removeEventListener('scroll', onUserScroll)
    }
  }, []);

  useEffect(() => {
    const categoriesWithProducts = categories.map(c => {
      const productsFilter = products.filter(p => p.categ_id[0] == c.id);
      if (productsFilter.length === 0) return null;
      else {
        c.products = productsFilter;
        return c;
      }
    });
    const categoriesWithProductsFiltered = categoriesWithProducts.filter(c => c !== null);
    setCategories(categoriesWithProductsFiltered);
  }, [products]);

  const onUserScroll = function () {
    const product_category_bar = document.getElementsByClassName('product_category_bar')[0];
    const category_product = document.getElementsByClassName('category_product')[0];
    if (product_category_bar === undefined || category_product === undefined) return;
    const productCategoryBarOffsetTop = product_category_bar.offsetTop;
    const pageOffsetYWithHeader = window.pageYOffset + 92.5;
    const productOffsetTop = category_product.offsetTop;
    switch (fixedCategoryBar) {
      case true:
        (pageOffsetYWithHeader + product_category_bar.height) < productOffsetTop && setFixedCategoryBar(false);
        break;
      case false:
        pageOffsetYWithHeader > productCategoryBarOffsetTop && setFixedCategoryBar(true);
        break;
    }

    const product_category_bar_arrays = document.getElementsByClassName('category_product');
    for (let i = 0; i < product_category_bar_arrays.length; i++) {
      console.log(product_category_bar_arrays[i].id, window.pageYOffset);
      if (product_category_bar_arrays[i].offsetTop <= window.pageYOffset) {
        setCurrentCategory_product_scroll(product_category_bar_arrays[i].id);
      }
    }
  }

  const ProductCategoryBar = () => (
    <div id="menu" className={"product_category_bar " + (fixedCategoryBar ? "stick" : "")}>
      {categories.map(category => <a className={currentCategory_product_scroll === `${category.id}-${category.name.replace(/\s+/g, '-')}` ? 'selected' : ''} key={category.id} href={`#${category.id}-${category.name}`}>{category.name}</a>)}
    </div>
  );

  const CategoryProduct = ({ category }) => (
    <div id={`${category.id}-${category.name.replace(/\s+/g, '-')}`} className={"mt-5 category_product "}>
      <h2>{category.name}</h2>
      <div className="row">
        {category.products.map(p => <Product key={p.id} product={p} setProductSelected={() => setProductSelected(p)} />)}
      </div>
    </div>
  );

  return (
    <div className="container mt-2">
      <ProductDetailPopup product={productSelected} />
      <ProductCategoryBar />
      {categories.map(category => (category.products && category.products.length) && <CategoryProduct key={category.id} category={category} />)}
    </div>
  );
}
export default ProductPage;