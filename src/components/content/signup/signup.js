import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUp } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/thumbnails/Logo.svg";
import "./signup.css";

function SignUp() {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required"),
  });
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(signUp(values));
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("users") || "[]"),
        values,
      ])
    );
    setSubmitting(false);
    resetForm();
    setSuccessMessage("Sign up successful!");
    navigate("/login");
  };

  return (
    <div className="signupWrapper">
      <div className="signup">
        <img src={Logo} className="signupImg" alt="header_Logo" />
        <p className="signupAccount">
          Already have an account?
          <span
            className="signupAccountSpan"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="singupForm">
              <div className="inputFieldWrap">
                <label htmlFor="email">
                  <span className="important">*</span>Email
                </label>
                <Field type="email" name="email" className="inputField" />
                <div className="error-icon">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="inputFieldWrap">
                <label htmlFor="password">
                  <span className="important">*</span>Password
                </label>
                <Field type="password" name="password" className="inputField" />
                <div className="error-icon">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="inputFieldWrap">
                <label htmlFor="confirmPassword">
                  <span className="important">*</span>Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="inputField"
                />
                <div className="error-icon">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>
              <div className="signupBtn">
                <button type="submit" disabled={isSubmitting}>
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {successMessage && <div>{successMessage}</div>}
      </div>
    </div>
  );
}

export default SignUp;
