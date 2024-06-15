import { DarkModeSwitcher } from "@/features/layout/components/DarkModeSwitcher";
import loginImage from "../../../assets/login.png";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <div class="flex justify-center items-center w-full h-full">
      <div class="basis-2/3 flex justify-center items-center">
        <img src={loginImage} class="w-[40rem] sm:w-[30rem]" />
      </div>
      <div class="flex flex-col justify-start items-center gap-20 basis-1/3 bg-backgroundForm w-full h-full border-s border-textSecondary">
        <div class="flex items-start justify-end w-full px-2 py-3">
          <DarkModeSwitcher />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
