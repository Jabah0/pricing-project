import { DarkModeSwitcher } from "@/features/layout/components/DarkModeSwitcher";
import loginImage from "../../../assets/login.png";
import { LoginForm } from "../components/LoginForm";
import { LanguageSwitcher } from "@/features/layout/components/LanguageSwitcher";

export const Login = () => {
  return (
    <div class="flex flex-wrap justify-center items-center w-full h-full">
      <div class="lg:basis-2/3 flex justify-center items-center">
        <img src={loginImage} class="w-[40rem] sm:w-[30rem]" />
      </div>
      <div
        class="flex flex-col justify-start items-center gap-20 lg:basis-1/3 bg-backgroundForm 
        w-full h-full shadow-xl px-2"
      >
        <div class="flex items-start justify-end gap-4 w-full px-2 py-3">
          <LanguageSwitcher />
          <DarkModeSwitcher />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
