import './App.css';

import ProductPage from './components/ProductPage/ProductPage';
import MyAccount from './components/MyAccount/MyAccount';
import About from './components/About/About';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import Banner from './components/Banner/Banner';

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/my-account">
        <MyAccount />
      </Route>
      <Route path="/about-us">
        <About />
      </Route>
      <Route path="/terms-and-conditions">
        <TermsAndConditions />
      </Route>
      <Route path="/contact/:id">
        cc
      </Route>
      <Route path="/">
        <Banner />
        <ProductPage />
      </Route>
    </Switch>
  );
}

export default App;
