import { useContext } from "react";
import AppContext from "../AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser, currentUserIsInGroup } = useContext(AppContext);
  const navigate = useNavigate();

  // LOGIN FORM FIELD HANDLERS
  const handleLogin = (e) => {
    let _login = e.target.value;
    setLogin(_login);
  };

  const handlePassword = (e) => {
    let _password = e.target.value;
    setPassword(_password);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    };

    const response = await fetch("http://localhost:3003/login", requestOptions);
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setLogin("");
      setPassword("");
      navigate("/");
    }
  };

  //   handleLogoutButton
  const handleLogoutButton = async (e) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:3003/logout",
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };
  return (
    <div>
      <h2>This is the Login page.</h2>
      {/* {currentUserIsInGroup("loggedInUsers") && (
      <div>
        <button onClick={handleLogoutButton}>Logout</button>
      </div>
       )} 
        */}

      {currentUserIsInGroup("loggedOutUsers") ? (
        <form>
          <fieldset>
            <legend>Login</legend>
            <div className="row">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={handleLogin}
              />
            </div>
            <div className="row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="buttonRow">
              <button onClick={handleLoginButton}>Submit</button>
            </div>
          </fieldset>
        </form>
      ) : (
        <button onClick={handleLogoutButton}>Logout</button>
      )}
    </div>
  );
};

export default PageLogin;
