import type { JSX } from "solid-js";

export function UsersIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M8 4.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-3 4a5 5 0 0 0-5 5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5a5 5 0 0 0-5-5m8.5 5.5h-2.322c.047-.158.072-.326.072-.5a6.24 6.24 0 0 0-2.492-4.994A5 5 0 0 1 14 13.5a.5.5 0 0 1-.5.5M9 7.5a3 3 0 0 1-.868-.127A4.235 4.235 0 0 0 9.25 4.5a4.235 4.235 0 0 0-1.118-2.873A3 3 0 1 1 9 7.5"
        clip-rule="evenodd"
      />
    </svg>
  );
}
