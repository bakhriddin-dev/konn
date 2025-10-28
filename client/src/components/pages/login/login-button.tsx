import { useDispatch } from "react-redux";
import { setCredentials, useGoogleLoginMutation } from "@/features";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";

export const GoogleLoginButton = () => {
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (response) => {
    try {
      const idToken = response.credential;
      const result = await googleLogin(idToken).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard/links");
    } catch (error) {
      console.log(error);
    }
  };

  return <GoogleLogin onSuccess={login} theme="filled_black" size="medium" />;
};
