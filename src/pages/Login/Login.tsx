import React from 'react'

import './login.css'
import Logo from '../../components/Logo/Logo'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { baseUrl } from '../../service/config';

interface Values {
    email: string;
    password: string
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
  password: Yup.string().min(4, "Too Short!, it should be atleast 8 characterlong")
              .required("Please enter your Password"),
});

const Login: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = (users: Values) => {
    const userData = {
      userEmail: users.email,
      userPassword: users.password,
    };
    axios
      .post(`${baseUrl}/auth/login`, userData)
      .then((response) => {
        const user = response.data.data;
        console.log(user);
        if (user) {
          sessionStorage.setItem("user", JSON.stringify(user));
          const previousUrl = sessionStorage.getItem('previousUrl');
          if(previousUrl) {
            navigate(previousUrl);
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="left container">
        <Logo />

        <div className="input-content">
          <h3>Welcome Back.</h3>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
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
                <div className="input-group">
                  <label htmlFor="">Email:</label>
                  <Field
                    type="email"
                    className={`${
                      errors.email && touched.email ? "invalid" : "valid-border"
                    }`}
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                  />
                  <div className="error">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="">Password:</label>
                  <Field
                    type="password"
                    className={`${
                      errors.password && touched.password
                        ? "invalid"
                        : "valid-border"
                    }`}
                    placeholder="Enter your password"
                    name="password"
                    id="password"
                  />
                  <div className="error">
                    <ErrorMessage name="password" className="error" />
                  </div>
                </div>

                <button type="submit">Login</button>
              </Form>
            )}
          </Formik>
          <p className="dont-have-account">
            Don't have account <Link to={"/register"}>Create here</Link>
          </p>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;