import type { JSX } from "solid-js";

export function MinusIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        stroke-dasharray="18"
        stroke-dashoffset="18"
        stroke-linecap="round"
        stroke-width="2"
        d="M5 12H19"
        fill="currentColor"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="18;0"
        />
      </path>
    </svg>
  );
}
