import type { JSX } from "solid-js";

export function FilterIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-.293.707L12 11.414V15a1 1 0 0 1-.293.707l-2 2A1 1 0 0 1 8 17v-5.586L3.293 6.707A1 1 0 0 1 3 6z"
        clip-rule="evenodd"
      />
    </svg>
  );
}
