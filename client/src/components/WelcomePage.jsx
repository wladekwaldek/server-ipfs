import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./components.css";
import { AuthContext } from "../context/AuthContext";

const WelcomePage = () => {
  const [user_from_storage, setUser_from_storage] = useState(false);
  const auth = useContext(AuthContext);

  const initialValues = {
    inputValue: "",
  };

  const firstReg = (value) => {
    const user = JSON.stringify({
      id: Date.now().toString(),
      password: value,
    });
    localStorage.setItem("user", user);
    setUser_from_storage(true);
    console.log(localStorage.getItem("user"));
  };

  const logIn = (value) => {
    auth.login(value);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) setUser_from_storage(true);
  }, []);

  const validationSchema = Yup.object().shape({
    inputValue: Yup.string().required("Поле обязательно для заполнения"),
  });

  return (
    <>
      <span>Привет</span>
      {user_from_storage ? (
        <span>Введите пароль:</span>
      ) : (
        <span>Придумайте пароль:</span>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          user_from_storage
            ? logIn(values.inputValue)
            : firstReg(values.inputValue);
        }}
      >
        <Form className="form">
          <Field type="text" name="inputValue" className="field" />
          <ErrorMessage
            name="inputValue"
            component="div"
            style={{ color: "white", fontSize: 16, marginBottom: 20 }}
          />
          <button type="submit" className="button">
            OK
          </button>
        </Form>
      </Formik>

      <button
        style={{ marginTop: 80 }}
        className="button"
        onClick={() => {
          localStorage.clear();
        }}
      >
        ВСЁ Удалить !!!
      </button>
    </>
  );
};

export default WelcomePage;
