import React from 'react'

import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { baseUrl } from '../../service/config';

interface Values {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string
}

const RegisterSchema = Yup.object().shape({
    firstname: Yup.string().required("Please enter your firstname"),
    lastname: Yup.string().required("Please enter your lastname"),
    email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: Yup.string().min(4, "Too Short!, it should be atleast 8 characterlong")
                .required("Please enter your Password"),
    confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});

const Register:React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (users: Values) => {
      const userData = {
          userEmail: users.email,
          userPassword: users.password,
          userFirstName: users.firstname,
          userLastName: users.lastname
      }
      axios
        .post(`${baseUrl}/auth/register`, userData)
        .then((response) => {
          const user = response.data.data;
          if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));

            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
    <div className="register">
      <div className="right">
        <Logo />
      </div>
      <div className="left container">
        <div className="input-content">
          <h3>Register to Login.</h3>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmpassword: ""
            }}
            validationSchema={RegisterSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="row-input">
                  <div className="input-group">
                    <label htmlFor="">First Name:</label>
                    <Field
                      name="firstname"
                      type="text"
                      placeholder="Enter your firstname"
                      className={`${
                        errors.firstname && touched.firstname
                          ? "invalid"
                          : "valid-border"
                      }`}
                    />
                    <div className="error">
                      <ErrorMessage name="firstname" className="error" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="">Last Name:</label>
                    <Field
                      name="lastname"
                      type="text"
                      placeholder="Enter your lastname"
                      className={`${
                        errors.lastname && touched.lastname
                          ? "invalid"
                          : "valid-border"
                      }`}
                    />
                    <div className="error">
                      <ErrorMessage name="lastname" className="error" />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`${
                      errors.email && touched.email ? "invalid" : "valid-border"
                    }`}
                  />
                  <div className="error">
                    <ErrorMessage name="email" className="error" />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="">Password:</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`${
                      errors.password && touched.password
                        ? "invalid"
                        : "valid-border"
                    }`}
                  />
                  <div className="error">
                    <ErrorMessage name="password" className="error" />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="">Confirm Password:</label>
                  <Field
                    type="password"
                    name="confirmpassword"
                    placeholder="Enter your password"
                    className={`${
                      errors.confirmpassword && touched.confirmpassword
                        ? "invalid"
                        : "valid-border"
                    }`}
                  />
                  <div className="error">
                    <ErrorMessage name="confirmpassword" className="error" />
                  </div>
                </div>

                <button type="submit">Register</button>
              </Form>
            )}
          </Formik>
          <p className="dont-have-account">
            Already have account <Link to={"/login"}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register