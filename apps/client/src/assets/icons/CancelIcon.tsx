import type { JSX } from "solid-js";

export function CancelIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-dasharray="12"
        stroke-dashoffset="12"
        stroke-linecap="round"
        stroke-width="2"
        d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="12;0"
        />
      </path>
    </svg>
  );
}
