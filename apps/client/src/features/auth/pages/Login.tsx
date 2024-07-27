import { DarkModeSwitcher } from "@/features/layout/components/DarkModeSwitcher";
import { DotLottieSolid } from "@lottiefiles/dotlottie-solid";
import { LoginForm } from "../components/LoginForm";
import { LanguageSwitcher } from "@/features/layout/components/LanguageSwitcher";

export const Login = () => {
  return (
    <div class="flex flex-wrap justify-center items-center w-full h-full">
      <div
        class="flex flex-col justify-start items-center gap-20 lg:basis-1/3 bg-backgroundForm 
        w-full h-full shadow-xl px-2"
      >
        <div class="flex items-end justify-start gap-4 w-full px-2 py-3">
          <LanguageSwitcher />
          <DarkModeSwitcher />
        </div>
        <LoginForm />
      </div>

      <div class="lg:basis-2/3 lg:flex hidden justify-center items-center">
        <DotLottieSolid
          src="../../../assets/loginAnimation.json"
          loop
          autoplay
        />
      </div>
    </div>
  );
};
