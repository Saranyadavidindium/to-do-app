import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const router = useNavigate();
  useEffect(() => {
    router("/");
  }, []);
  return null;
}
