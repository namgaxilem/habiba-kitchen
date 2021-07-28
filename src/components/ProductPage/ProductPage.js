import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './productPage.scss';
import ProductDetailPopup from '../ProductDetailPopup/ProductDetailPopup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartStore';

const mock_product_data = {
  categories: [
    {
      "id": 23,
      "name": "Acoustic Bloc Screens"
    },
    {
      "id": 15,
      "name": "Cabinet with Doors"
    },
    {
      "id": 28,
      "name": "Cable Management Box"
    },
    {
      "id": 16,
      "name": "Conference Chair (CONFIG)"
    },
    {
      "id": 18,
      "name": "Corner Desk Left Sit"
    },
    {
      "id": 10,
      "name": "Corner Desk Right Sit"
    },
    {
      "id": 9,
      "name": "Customizable Desk (CONFIG)"
    },
    {
      "id": 8,
      "name": "Desk Combination"
    },
    {
      "id": 21,
      "name": "Desk Stand with Screen"
    },
    {
      "id": 24,
      "name": "Drawer"
    },
    {
      "id": 19,
      "name": "Drawer Black"
    },
    {
      "id": 25,
      "name": "Four Person Desk"
    },
    {
      "id": 31,
      "name": "Hamburger"
    },
    {
      "id": 22,
      "name": "Individual Workplace"
    },
    {
      "id": 11,
      "name": "Large Cabinet"
    },
    {
      "id": 13,
      "name": "Large Desk"
    },
    {
      "id": 26,
      "name": "Large Meeting Table"
    },
    {
      "id": 5,
      "name": "Office Chair"
    },
    {
      "id": 17,
      "name": "Office Chair Black"
    },
    {
      "id": 7,
      "name": "Office Design Software"
    },
    {
      "id": 6,
      "name": "Office Lamp"
    },
    {
      "id": 14,
      "name": "Pedal Bin"
    },
    {
      "id": 12,
      "name": "Storage Box"
    },
    {
      "id": 27,
      "name": "Three-Seat Sofa"
    },
    {
      "id": 30,
      "name": "Warranty"
    }
  ],
  products: [
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        14,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        12,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        12,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        12,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        30,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": Math.random(),
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        15,
      ]
    },
    {
      "id": 23,
      "name": "Acoustic Bloc Screens",
      "list_price": 2950.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 15,
      "name": "Cabinet with Doors",
      "list_price": 14.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 28,
      "name": "Cable Management Box",
      "list_price": 100.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 16,
      "name": "Conference Chair (CONFIG)",
      "list_price": 16.5,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 18,
      "name": "Corner Desk Left Sit",
      "list_price": 85.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 10,
      "name": "Corner Desk Right Sit",
      "list_price": 147.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 9,
      "name": "Customizable Desk (CONFIG)",
      "list_price": 750.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 8,
      "name": "Desk Combination",
      "list_price": 450.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 21,
      "name": "Desk Stand with Screen",
      "list_price": 2100.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 24,
      "name": "Drawer",
      "list_price": 3645.0,
      "description": "Drawer with two routing possiblities.",
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 19,
      "name": "Drawer Black",
      "list_price": 25.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 25,
      "name": "Four Person Desk",
      "list_price": 23500.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 31,
      "name": "Hamburger",
      "list_price": 1.0,
      "description": false,
      "categ_id": [
        1,
        "All"
      ]
    },
    {
      "id": 22,
      "name": "Individual Workplace",
      "list_price": 885.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 11,
      "name": "Large Cabinet",
      "list_price": 320.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 13,
      "name": "Large Desk",
      "list_price": 1799.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 26,
      "name": "Large Meeting Table",
      "list_price": 40000.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 5,
      "name": "Office Chair",
      "list_price": 70.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 17,
      "name": "Office Chair Black",
      "list_price": 12.5,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 7,
      "name": "Office Design Software",
      "list_price": 280.0,
      "description": false,
      "categ_id": [
        7,
        "All / Saleable / Software"
      ]
    },
    {
      "id": 6,
      "name": "Office Lamp",
      "list_price": 40.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 14,
      "name": "Pedal Bin",
      "list_price": 47.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 12,
      "name": "Storage Box",
      "list_price": 79.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 27,
      "name": "Three-Seat Sofa",
      "list_price": 1500.0,
      "description": false,
      "categ_id": [
        8,
        "All / Saleable / Office Furniture"
      ]
    },
    {
      "id": 30,
      "name": "Warranty",
      "list_price": 20.0,
      "description": false,
      "categ_id": [
        5,
        "All / Saleable / Services"
      ]
    }
  ]
}

function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesWithProduct, setCategoriesWithProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState({})
  const [fixedCategoryBar, setFixedCategoryBar] = useState(false);
  const [currentCategory_product_scroll, setCurrentCategory_product_scroll] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // axios.get('http://localhost:8069/frontend/get_product', {
    //   method: 'GET',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/text',
    //   },
    // }).then(result => {
    //   setCategories(result.data.categories);
    //   setCategoriesWithProduct(result.data.categories);
    //   setProducts(result.data.products);
    // }, (error) => {
    //   console.log("error", error);
    // });

    setCategories(mock_product_data.categories);
    setCategoriesWithProduct(mock_product_data.categories);
    setProducts(mock_product_data.products);

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
    setCategoriesWithProduct(categoriesWithProductsFiltered);
  }, [products]);

  const onUserScroll = () => {
    const product_category_bar = document.getElementById('productCategoryBar');
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

    if (window.oldPageYOffset < window.pageYOffset) { // if page go down
      for (let i = product_category_bar_arrays.length - 1; i >= 0; i--) {
        const scrollToPosition = product_category_bar_arrays[i].offsetTop - product_category_bar.offsetHeight - 92.5 - 60;
        const positionWindowPageYOffset = window.pageYOffset + (window.innerHeight / 2);
        if ((scrollToPosition - positionWindowPageYOffset) <= 0) {
          setCurrentCategory_product_scroll(product_category_bar_arrays[i].id);
          break;
        }
      }
    } else if (window.oldPageYOffset > window.pageYOffset) { // if page go down
      for (let i = 0; i < product_category_bar_arrays.length; i++) {
        const scrollToPosition = product_category_bar_arrays[i].offsetTop - product_category_bar.offsetHeight - 92.5 - 60;
        const endOfScrollToPosition = scrollToPosition + product_category_bar_arrays[i].offsetHeight;
        const positionWindowPageYOffset = window.pageYOffset + (window.innerHeight / 2);
        if ((positionWindowPageYOffset - endOfScrollToPosition) <= 0) {
          setCurrentCategory_product_scroll(product_category_bar_arrays[i].id);
          break;
        }
      }
    }
    window.oldPageYOffset = window.pageYOffset;

  }

  const onProductCategoryBarclick = (category) => {
    const id = `${category.id}-${category.name.replace(/\s+/g, '-')}`;
    const productCategoryBarItem = document.getElementById(id);
    const productCategoryBar = document.getElementById('productCategoryBar');
    const scrollToPosition = productCategoryBarItem.offsetTop - productCategoryBar.offsetHeight - 92.5 - 60;
    window.scrollTo(0, scrollToPosition);
  }

  const ProductCategoryBar = () => (
    <div id="productCategoryBar" className={"product_category_bar " + (fixedCategoryBar ? "stick" : "")}>
      {categoriesWithProduct.map(category =>
        <a className={currentCategory_product_scroll === `${category.id}-${category.name.replace(/\s+/g, '-')}` ? 'selected' : ''}
          key={category.id}
          onClick={() => onProductCategoryBarclick(category)}>
          {category.name}
        </a>)}
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
      {categoriesWithProduct.map(category => (category.products && category.products.length) && <CategoryProduct key={category.id} category={category} />)}
    </div>
  );
}
export default ProductPage;