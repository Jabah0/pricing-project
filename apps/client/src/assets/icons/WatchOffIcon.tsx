import type { JSX } from "solid-js";

export function WatchOffIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <clipPath id="lineMdWatchOff0">
          <rect width="24" height="12" />
        </clipPath>
        <symbol id="lineMdWatchOff1">
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z"
            clip-path="url(#lineMdWatchOff0)"
          >
            <animate
              fill="freeze"
              attributeName="d"
              dur="0.5s"
              values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z"
            />
          </path>
        </symbol>
        <mask id="lineMdWatchOff2">
          <use href="#lineMdWatchOff1" />
          <use href="#lineMdWatchOff1" transform="rotate(180 12 12)" />
          <circle cx="12" cy="12" r="0" fill="#fff">
            <animate fill="freeze" attributeName="r" dur="0.2s" values="0;3" />
          </circle>
          <g
            fill="none"
            stroke-dasharray="26"
            stroke-dashoffset="26"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            transform="rotate(45 13 12)"
          >
            <path stroke="#000" d="M0 11h24" />
            <path stroke="#fff" d="M1 13h22" />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.6s"
              dur="0.2s"
              values="26;0"
            />
          </g>
        </mask>
      </defs>
      <rect
        width="24"
        height="24"
        fill="currentColor"
        mask="url(#lineMdWatchOff2)"
      />
    </svg>
  );
}
