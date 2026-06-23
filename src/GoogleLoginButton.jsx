import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton({ onLoginSuccess }) {
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const response = await fetch("http://localhost:5000/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        });

        const data = await response.json();
        onLoginSuccess(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");

      }}
      onError={() => {
        console.log("Google login failed");
      }}
    />
  );
}

export default GoogleLoginButton;
