import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/");
  }, []);
  return <h1>Not found</h1>;
}
