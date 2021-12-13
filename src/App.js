import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import PageWelcome from "./pages/PageWelcome";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
import PageLogout from "./pages/PageLogout";
import PageAdmin from "./pages/PageAdmin";
import "./App.scss";

import { useContext } from "react";
import AppContext from "./AppContext";

function App() {
  const { setCurrentUser, currentUser, currentUserIsInGroup } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(
        "http://localhost:3003/currentuser",
        requestOptions
      );

      if (response.ok) {
        const _currentUser = await response.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
    })();
  }, [setCurrentUser]);

  return (
    <div className="App">
      {currentUser.login && (
        <>
          <h1>MERN Showcase App</h1>
          {currentUserIsInGroup("loggedINUser") && (
            <h2>
              {currentUser.firstName} {currentUser.lastName}
            </h2>
          )}
          <Nav />

          <div className="content">
            <Routes>
              <Route path="/" element={<PageWelcome />} />
              {currentUserIsInGroup("loggedOutUsers") && (
                <Route path="register" element={<PageRegister />} />
              )}
              {currentUserIsInGroup("loggedOutUsers") && (
                <Route path="login" element={<PageLogin />} />
              )}
              {currentUserIsInGroup("admins") && (
                <Route path="admin" element={<PageAdmin />} />
              )}
              {currentUserIsInGroup("loggedINUser") && (
                <Route path="logout" element={<PageLogout />} />
              )}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
