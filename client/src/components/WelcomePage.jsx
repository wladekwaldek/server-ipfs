import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./components.css";
import { AuthContext } from "../context/AuthContext";

const webApp = window.Telegram.WebApp;

const WelcomePage = () => {
  const [first_name, setFirst_name] = useState("");
  const [user_id, setUser_id] = useState("");
  const [user_from_storage, setUser_from_storage] = useState("");
  const auth = useContext(AuthContext);
  //const [apiKey, setApiKey] = useState("");

  const initialValues = {
    inputValue: "",
  };

  const firstReg = (values) => {
    localStorage.setItem(user_id, values.inputValue);
    const id = localStorage.getItem(user_id);
    setUser_from_storage(id);
  };

  const logIn = (values) => {
    auth.login(values, user_id);
  };

  const getApiKey = async () => {
    const data = await fetch("/api/example");
    const response = await data.text();
    console.log(response);
  };

  useEffect(() => {
    webApp.ready();
    if (webApp.initData) {
      webApp.BackButton.isVisible = false;
      setFirst_name(webApp.initDataUnsafe?.user?.first_name);
      setUser_id(webApp.initDataUnsafe?.user?.id.toString());
      setUser_from_storage(localStorage.getItem(user_id));
    } else {
      getApiKey();
    }
  }, [user_id]);

  const validationSchema = Yup.object().shape({
    inputValue: Yup.string().required("Поле обязательно для заполнения"),
  });

  if (!webApp.initData) {
    return (
      <div>
        {/* <h1>{apiKey}</h1> */}
        <span
          style={{
            color: "white",
            fontStyle: "italic",
            fontSize: "2em",
            marginRight: 5,
          }}
        >
          Войдите через
        </span>
        <a href="https://t.me/passwordsMaker_bot"> телеграм-бот</a>
      </div>
    );
  } else {
    return (
      <>
        <span>Привет {first_name}</span>
        {user_from_storage ? (
          <span>Введите пароль:</span>
        ) : (
          <span>Придумайте пароль:</span>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={user_from_storage ? logIn : firstReg}
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
  }
};

export default WelcomePage;
