import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./components.css";
import ListElement from "./ListElement";

const webApp = window.Telegram.WebApp;

export default function List() {
  const [list, setList] = useState([]);
  const [fields, setFields] = useState([]);
  const title = useLocation();
  const navigation = useNavigate();
  const searchParams = new URLSearchParams(title?.search);
  const query = searchParams.get("query");

  const goToForm = () => {
    navigation("/form", { state: { category: title.state?.category } });
  };

  const removeItem = (id) => {
    const result = window.confirm("Удалить элемент из списка?");
    if (result) {
      localStorage.removeItem(title.state?.category);
      const newList = list.filter((el) => el.id !== id);
      localStorage.setItem(
        title.state?.category,
        JSON.stringify({ data: newList, fields })
      );
      setList(newList);
    }
  };

  const toBack = (title) => {
    if (title === "/list") {
      navigation("/");
    } else {
      alert(title);
    }
  };

  useEffect(() => {
    webApp.ready();
    if (webApp.initData) {
      webApp.BackButton.isVisible = true;
      webApp.BackButton.onClick(() => toBack(title.pathname));
      const listFromLocal = JSON.parse(
        localStorage.getItem(title.state?.category)
      );
      if (listFromLocal) {
        setList(listFromLocal.data);
        setFields(listFromLocal.fields);
      }
      if (query) {
        const item = list.filter((i) => i.title === query);
        setList(item);
      }
      console.log(title.state?.category);
    } else {
      navigation("/");
    }
  }, [title.state?.category, query]);

  return (
    <>
      <div className="list_container">
        {list.length > 0 ? (
          list.map((el, index) => {
            const array = fields;

            const resultObject = array.reduce((acc, item) => {
              const key = item.fieldTitle;
              const value = el[item.id];
              acc[key] = value;
              return acc;
            }, {});

            const entries = Object.entries(resultObject);

            const content = entries.map(([key, value], index) => (
              <ListElement field={key} value={value} key={index} />
            ));

            return (
              <div key={index} className="element">
                {content}
                <span
                  onClick={() => {
                    navigation("/form", {
                      state: { category: title.state?.category, el },
                    });
                  }}
                  style={{ position: "absolute", top: "10%", right: "30px" }}
                >
                  <i className="fa fa-edit" />
                </span>
                <span
                  onClick={() => removeItem(el.id)}
                  style={{ position: "absolute", top: "10%", right: "10px" }}
                >
                  <i className="fa fa-trash" />
                </span>
              </div>
            );
          })
        ) : (
          <>
            <div>Ваш список пока пуст.</div>
          </>
        )}
      </div>
      <div className="ad_button" onClick={goToForm}>
        Добавить
      </div>
    </>
  );
}
