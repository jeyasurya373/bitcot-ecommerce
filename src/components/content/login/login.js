import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../../redux/features/authSlice";
import "./login.css";
import Logo from "../../../assets/images/thumbnails/Logo.svg";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState(null);
  const users = useSelector((state) => state.auth.users);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const user =
      users[0].email === values.email && users[0].password === values.password;
    if (user) {
      dispatch(login({ token: "static-token" }));
      localStorage.setItem("token", "static-token");
      setSubmitting(false);
      setErrorMessage(null);
      console.log("log in success");
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <img src={Logo} className="LoginlogoImg" alt="header_Logo" />
        <p className="logoAccount">
          Don't have an account yet?
          <span
            className="logoAccountSpan"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="loginForm">
              <div className="email">
                <label htmlFor="email">
                  <span className="important">*</span>Email
                </label>
                <Field type="email" name="email" className="emailInput" />
                <div className="error-icon">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="email">
                <label htmlFor="password">
                  <span className="important">*</span>Password
                </label>
                <Field type="password" name="password" className="emailInput" />
                <div className="error-icon">
                  <ErrorMessage name="password" />
                </div>
              </div>
              {errorMessage && <div>{errorMessage}</div>}
              <div className="loginBtn">
                <button type="submit" disabled={isSubmitting}>
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LogIn;
