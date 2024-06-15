import { JSX } from "solid-js";

export const TextInput = (props: JSX.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div class="bg-inputForm shadow-lg rounded-md border border-gray-400 p-1">
      <input {...props} class="bg-transparent text-text w-full" />
    </div>
  );
};
