import { useNavigate } from "react-router-dom";
import "./components.css";
import { useEffect } from "react";

const webApp = window.Telegram.WebApp;

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (webApp.initData) {
      webApp.BackButton.isVisible = false;
    }
  }, []);
  return (
    <>
      <button
        className="element"
        onClick={() => navigate("/list", { state: { category: "email" } })}
      >
        Электронные почты
      </button>
      <button
        className="element"
        onClick={() => navigate("/list", { state: { category: "sites" } })}
      >
        Сайты
      </button>
      <button
        className="element"
        onClick={() => navigate("/list", { state: { category: "networks" } })}
      >
        Социальные сети
      </button>
      <button
        className="element"
        onClick={() => navigate("/list", { state: { category: "other" } })}
      >
        Другое
      </button>
    </>
  );
};

export default MainPage;
