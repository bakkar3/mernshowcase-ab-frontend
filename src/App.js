import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [signupFormField_login, setSignupFormField_login] = useState("");
  const [signupFormField_password1, setSignupFormField_password1] =
    useState("");
  const [signupFormField_password2, setSignupFormField_password2] =
    useState("");
  const [signupFormField_firstName, setSignupFormField_firstName] =
    useState("");
  const [signupFormField_lastName, setSignupFormField_lastName] = useState("");
  const [signupFormField_email, setSignupFormField_email] = useState("");

  // const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);

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
  }, []);

  const currentUserIsInGroup = (accessGroup) => {
    const accessGroupArray = currentUser.accessGroups
      .split(",")
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };

  // LOGIN FORM FIELD HANDLERS
  const handleLogin = (e) => {
    let _login = e.target.value;
    setLogin(_login);
  };

  const handlePassword = (e) => {
    let _password = e.target.value;
    setPassword(_password);
  };

  const handleButton = async (e) => {
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
      console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setLogin("");
      setPassword("");
    }
  };

  const handleLogout = async (e) => {
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

  // SIGNUP FORM FIELD HANDLERS
  const handle_signupFormField_login = (e) => {
    let login = e.target.value;
    setSignupFormField_login(login);
  };
  const handle_signupFormField_password1 = (e) => {
    let password1 = e.target.value;
    setSignupFormField_password1(password1);
  };
  const handle_signupFormField_password2 = (e) => {
    let password2 = e.target.value;
    setSignupFormField_password2(password2);
  };
  const handle_signupFormField_firstName = (e) => {
    let firstName = e.target.value;
    setSignupFormField_firstName(firstName);
  };
  const handle_signupFormField_lastName = (e) => {
    let lastName = e.target.value;
    setSignupFormField_lastName(lastName);
  };
  const handle_signupFormField_email = (e) => {
    let email = e.target.value;
    setSignupFormField_email(email);
  };
  const handle_signupForm_signupButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          login: signupFormField_login,
          password1: signupFormField_password1,
          password2: signupFormField_password2,
          firstName: signupFormField_firstName,
          lastName: signupFormField_lastName,
          email: signupFormField_email,
        },
      }),
    };
    const response = await fetch(
      "http://localhost:3003/signup",
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setSignupFormField_login("");
      setSignupFormField_password1("");
      setSignupFormField_password2("");
      setSignupFormField_firstName("");
      setSignupFormField_lastName("");
      setSignupFormField_email("");
    }
  };

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

          {/* {currentUserIsInGroup("loggedInUsers") && ( */}
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          {/* )} */}

          {currentUserIsInGroup("loggedOutUsers") && (
            <>
              <form>
                <fieldset>
                  <legend>Login</legend>
                  <div className="row">
                    <label htmlFor="login">Username</label>
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
                    <button onClick={handleButton}>Submit</button>
                  </div>
                </fieldset>
              </form>
              <form>
                <fieldset>
                  <legend>Signup</legend>
                  <div className="row">
                    <label htmlFor="signupFormField_login">Login</label>
                    <input
                      type="text"
                      id="signupFormField_login"
                      value={signupFormField_login}
                      onChange={handle_signupFormField_login}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="signupFormField_password1">
                      Password 1
                    </label>
                    <input
                      type="password"
                      id="signupFormField_password1"
                      value={signupFormField_password1}
                      onChange={handle_signupFormField_password1}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="signupFormField_password2">
                      Password 2
                    </label>
                    <input
                      type="password"
                      id="signupFormField_password2"
                      value={signupFormField_password2}
                      onChange={handle_signupFormField_password2}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="signupFormField_firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="signupFormField_firstName"
                      value={signupFormField_firstName}
                      onChange={handle_signupFormField_firstName}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="signupFormField_lastName">Last Name</label>
                    <input
                      type="text"
                      id="signupFormField_lastName"
                      value={signupFormField_lastName}
                      onChange={handle_signupFormField_lastName}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="signupFormField_email">E-Mail</label>
                    <input
                      type="text"
                      id="signupFormField_email"
                      value={signupFormField_email}
                      onChange={handle_signupFormField_email}
                    />
                  </div>
                  <div className="buttonRow">
                    <button onClick={handle_signupForm_signupButton}>
                      Submit
                    </button>
                  </div>
                </fieldset>
              </form>
            </>
          )}

          {currentUserIsInGroup("loggedOutUsers") && (
            <div className="panel">Welcome to this site.</div>
          )}
          {currentUserIsInGroup("notApprovedUsers") && (
            <>
              <div className="panel">
                <h3>Thank you for registering!</h3>
                An administrator will approve your account as soon as possible.
              </div>
            </>
          )}
          {currentUserIsInGroup("members") && (
            <>
              <div className="panel">
                <h3>Current Site News for Members</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Neque explicabo voluptate quia asperiores sit! Vel molestiae
                  labore ratione non dolores? Exercitationem soluta quo id
                  laboriosam, autem perferendis? Fuga, suscipit ipsa.
                </p>
              </div>
            </>
          )}
          {currentUserIsInGroup("contentEditors") && (
            <>
              <div className="panel">
                <h3>Content Editor Section:</h3>
                <div>
                  <button>Edit Welcome Page</button>
                </div>
                <div>
                  <button>Create New Page</button>
                </div>
              </div>
            </>
          )}
          {currentUserIsInGroup("admins") && (
            <>
              <div className="panel">
                <h3>Admin Section:</h3>
                <div>
                  <button>Create users</button>
                </div>
                <div>
                  <button>Edit users</button>
                </div>
                <div>
                  <button>Delete users</button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
