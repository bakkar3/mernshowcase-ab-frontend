import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom";

const PageRegister = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AppContext);

  const [signupFormField_login, setSignupFormField_login] = useState("");
  const [signupFormField_password1, setSignupFormField_password1] = useState("");
  const [signupFormField_password2, setSignupFormField_password2] = useState("");
  const [signupFormField_firstName, setSignupFormField_firstName] = useState("");
  const [signupFormField_lastName, setSignupFormField_lastName] = useState("");
  const [signupFormField_email, setSignupFormField_email] = useState("");

  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  useEffect(() => {
    setFormIsValid(
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      signupFormField_password1 === signupFormField_password2
    )
  }, [firstNameIsValid, lastNameIsValid, emailIsValid, signupFormField_password1, signupFormField_password2]);

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
    firstName.length > 1 && firstName.length <= 20 ? setFirstNameIsValid(true) : setFirstNameIsValid(false);
    setSignupFormField_firstName(firstName);
  };
  const handle_signupFormField_lastName = (e) => {
    let lastName = e.target.value;
    lastName.length > 1 && lastName.length <= 20 ? setLastNameIsValid(true) : setLastNameIsValid(false);
    setSignupFormField_lastName(lastName);
  };
  const handle_signupFormField_email = (e) => {
    let email = e.target.value;
    email && /^[a-z0-9_.-]{2,}@[a-z]{2,}\.[a-z]{2,}$/gi.test(email) ? setEmailIsValid(true) : setEmailIsValid(false);
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, requestOptions);
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setSignupFormField_login("");
      setSignupFormField_password1("");
      setSignupFormField_password2("");
      setSignupFormField_firstName("");
      setSignupFormField_lastName("");
      setSignupFormField_email("");
      navigate("/");
    }
  };

  return (
    <div>
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
            <label htmlFor="signupFormField_password1">Password 1</label>
            <input
              type="password"
              id="signupFormField_password1"
              value={signupFormField_password1}
              onChange={handle_signupFormField_password1}
            />
          </div>
          <div className="row">
            <label htmlFor="signupFormField_password2">Password 2</label>
            <input
              type="password"
              id="signupFormField_password2"
              value={signupFormField_password2}
              onChange={handle_signupFormField_password2}
            />
          </div>
          <div className="row">
            <label htmlFor="signupFormField_firstName">First Name</label>
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
            <button disabled={!formIsValid} onClick={handle_signupForm_signupButton}>Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PageRegister;
