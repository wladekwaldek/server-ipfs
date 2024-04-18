import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./components.css";

export default function Form() {
  const [form, setForm] = useState({});
  const [fields, setFields] = useState([]);
  const [list, setList] = useState([]);
  const title = useLocation();
  const navigation = useNavigate();

  const toBack = () => {
    navigation("/list", { state: { category: title.state.category } });
  };

  useEffect(() => {
    const listFromLocal = JSON.parse(
      localStorage.getItem(title.state?.category)
    );

    if (listFromLocal) setList(listFromLocal.data);
    switch (title.state?.category) {
      case "email":
        setFields([
          { id: "title", fieldTitle: "Название: " },
          { id: "email", fieldTitle: "Эл. почта: " },
          { id: "password", fieldTitle: "Пароль: " },
          { id: "notes", fieldTitle: "Заметки: " },
        ]);
        setForm({
          title: title.state?.el?.title || "",
          email: title.state?.el?.email || "",
          password: title.state?.el?.password || "",
          notes: title.state?.el?.notes || "",
        });
        break;
      case "sites":
        setFields([
          { id: "title", fieldTitle: "Название: " },
          { id: "link", fieldTitle: "Веб-ссылка: " },
          { id: "login", fieldTitle: "Логин: " },
          { id: "email", fieldTitle: "Эл. почта: " },
          { id: "password", fieldTitle: "Пароль: " },
          { id: "notes", fieldTitle: "Заметки: " },
        ]);
        setForm({
          title: title.state?.el?.title || "",
          link: title.state?.el?.link || "",
          login: title.state?.el?.login || "",
          email: title.state?.el?.email || "",
          password: title.state?.el?.password || "",
          notes: title.state?.el?.notes || "",
        });
        break;
      case "networks":
        setFields([
          { id: "title", fieldTitle: "Название: " },
          { id: "login", fieldTitle: "Логин: " },
          { id: "email", fieldTitle: "Эл. почта: " },
          { id: "password", fieldTitle: "Пароль: " },
          { id: "notes", fieldTitle: "Заметки: " },
        ]);
        setForm({
          title: title.state?.el?.title || "",
          login: title.state?.el?.login || "",
          email: title.state?.el?.email || "",
          password: title.state?.el?.password || "",
          notes: title.state?.el?.notes || "",
        });
        break;
      default:
        setFields([
          { id: "title", fieldTitle: "Название: " },
          { id: "notes", fieldTitle: "Заметки: " },
        ]);
        setForm({
          title: title.state?.el?.title || "",
          notes: title.state?.el?.notes || "",
        });
    }
  }, [title.state.category, title.state.el]);

  const generatePassword = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const adElement = () => {
    const duble = list.find((i) => i.title === form.title);
    if (form.title === "") {
      alert("Введите название");
    } else if (duble) {
      alert("Элемент списка с таким названием уже существует.");
    } else {
      const newLocalList = [...list, { ...form, id: Date.now().toString() }];
      localStorage.setItem(
        title.state?.category,
        JSON.stringify({ data: newLocalList, fields })
      );
      navigation("/list", { state: { category: title.state?.category } });
    }
  };

  const editElement = (id) => {
    const editIndex = list.findIndex((item) => item.id === id);
    if (editIndex !== -1) {
      const newLocalList = list;
      newLocalList[editIndex] = { ...form, id: list[editIndex].id };
      localStorage.setItem(
        title.state?.category,
        JSON.stringify({ data: newLocalList, fields })
      );
    }
    navigation("/list", { state: { category: title.state?.category } });
  };

  return (
    <>
      <div className="list_container">
        {fields.map((field, index) => (
          <div className="input-container" key={index}>
            <label htmlFor={field.id}>{field.fieldTitle}</label>
            <div className="input-wrap">
              <textarea
                maxLength={100}
                className="input"
                name={field.id}
                id={field.id}
                onChange={changeHandler}
                value={form[field.id]}
              />
              {field.id === "password" && (
                <div
                  onClick={() => {
                    setForm({ ...form, password: generatePassword(10) });
                  }}
                >
                  <i className="fa fa-sync" />
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          className="button"
          onClick={
            title.state?.el?.id
              ? () => editElement(title.state?.el?.id)
              : adElement
          }
        >
          Готово
        </button>
        <div onClick={toBack}>
          <i className="fa fa-arrow-left" />
        </div>
      </div>
    </>
  );
}
