import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewsTop from "./pages/NewsTop";
import NewsForDate from "./pages/NewsForDate";
import { Navigation } from "./components/Navigation";
import { NewsSinglePage } from "./pages/NewsSinglePage";
import NewsCategory from "./pages/NewsCategory";
import PartnerPostNews from "./pages/PartnerPostNews";
import ProfilePage from "./pages/ProfilePage";
import Logout from "./components/Logout";
import PostNews from "./pages/PostNews";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import UpdateNewsPartner from "./pages/UpdateNewsPartner";
import ErrorBanner from "./components/ErrorBanner";
import ScrollControl from "./components/ScrollControl";
import Footer from "./components/footer";
import OtherUSerProfile from "./pages/OtherUSerProfile";

function App() {
  return (
    <BrowserRouter>
      <ScrollControl />
      <ErrorBanner />
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/NewsForDate">
            <NewsForDate />
          </Route>
          <Route path="/NewsCategory/:category/">
            <NewsCategory />
          </Route>
          <Route path="/postNews">
            <PostNews />
          </Route>
          <Route path="/partnerPostNews">
            <PartnerPostNews />
          </Route>
          <Route path="/news/:id">
            <NewsSinglePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/OtherUSerProfile/:idUser">
            <OtherUSerProfile />
          </Route>
          <Route path="/UpdateUserProfile">
            <UpdateUserProfile />
          </Route>
          <Route path="/updateNewsPartner/:id">
            <UpdateNewsPartner />
          </Route>
          <Route path="/">
            <NewsTop />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
