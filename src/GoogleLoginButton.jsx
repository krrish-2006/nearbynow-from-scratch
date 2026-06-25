import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton({ onLoginSuccess }) {
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
const response = await fetch(
  `${import.meta.env.VITE_API_URL}/auth/google`,
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        });
        const data = await response.json();

        onLoginSuccess(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));

        localStorage.setItem("token", data.token);

        navigate("/");
      }}
      onError={() => {
        console.log("Google login failed");
      }}
    />
  );
}

export default GoogleLoginButton;
