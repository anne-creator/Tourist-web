import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage } from './pages';
import { Redirect } from "react-router-dom";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
// import { getShoppingCart } from "./redux/shoppingCart/slice";


const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signIn" }} />
    );
  }
  return <Route render={routeComponent} {...rest} />;
}
function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/*Switch only render single page, exact only render the exact path. */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signIn' component={SignInPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path='/search/:keywords?' component={SearchPage} />
          <Route render={() => <h1>404 not found 页面去火星了 ！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
