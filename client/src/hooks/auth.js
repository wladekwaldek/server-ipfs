import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (value) => {
    const user_from_local = localStorage.getItem("user");
    const user = JSON.parse(user_from_local);
    if (user.password === value) {
      setIsAuthenticated(true);
    } else {
      alert("Неверные данные");
    }
  };

  return { isAuthenticated, login };
};
