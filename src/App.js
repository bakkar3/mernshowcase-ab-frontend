import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import PageWelcome from "./pages/PageWelcome";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
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
          {currentUserIsInGroup("loggedInUsers") && (
            <h2>
              {currentUser.firstName} {currentUser.lastName}
            </h2>
          )}
          <Nav />
          <div className="content">
            <Routes>
              <Route path="/" element={<PageWelcome />} />
              <Route path="register" element={<PageRegister />} />
              <Route path="login" element={<PageLogin />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
