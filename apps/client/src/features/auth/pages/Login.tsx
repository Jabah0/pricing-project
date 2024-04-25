import loginImage from "../../../assets/login.png";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <div class="flex justify-center items-center w-full h-full">
      <div class="basis-2/3 flex justify-center items-center">
        <img src={loginImage} class="w-[40rem]" />
      </div>
      <div class="basis-1/3 bg-backgroundSec w-full h-full flex justify-center items-center border-s border-gray-600">
        <LoginForm />
      </div>
    </div>
  );
};
