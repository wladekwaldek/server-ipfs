import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (values, user_id) => {
    const id = localStorage.getItem(user_id);
    if (id === values.inputValue) {
      setIsAuthenticated(true);
    } else {
      alert("Неверные данные");
    }
  };

  return { isAuthenticated, login };
};
