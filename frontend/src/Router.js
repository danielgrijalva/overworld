import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Game from "./modules/game/";
import { Navbar, SignUpPage, SignInPage } from "./modules/app/components/";
import App from "./modules/app/";
import Profile from "./modules/profile/";
import Settings from "./modules/settings/";
import { Developer } from "./modules/developer";
import { loadUser } from "./modules/app/actions";

const notFound = () => {
  return <p>Not Found</p>;
};

class AppRouter extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={SignInPage} />
            <Route path="/games/:slug" component={Game} />
            <Route path="/user/:username" component={Profile} />
            <Route path="/developer/:creator" component={Developer} />
            <Route path="/settings" component={Settings} />
            <Route component={notFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppRouter;
