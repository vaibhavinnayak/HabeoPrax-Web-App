// GoogleSuccessPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", `Bearer ${token}`);
      navigate("/home");
    } else {
      alert("Google login failed.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
};

export default GoogleSuccessPage;
