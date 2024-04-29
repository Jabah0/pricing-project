import type { JSX } from "solid-js";

export function EditIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21H21">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="20;0"
          />
        </path>
        <path
          stroke-dasharray="44"
          stroke-dashoffset="44"
          d="M7 17V13L17 3L21 7L11 17H7"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.6s"
            values="44;0"
          />
        </path>
        <path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6L18 10">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            dur="0.2s"
            values="8;0"
          />
        </path>
      </g>
    </svg>
  );
}
