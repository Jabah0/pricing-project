import type { JSX } from "solid-js";

export function ClearNightFill(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5em"
      height="5em"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <linearGradient
          id="meteoconsClearNightFill0"
          x1="54.3"
          x2="187.2"
          y1="29"
          y2="259.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#86c3db" />
          <stop offset=".5" stop-color="#86c3db" />
          <stop offset="1" stop-color="#5eafcf" />
        </linearGradient>
        <symbol id="meteoconsClearNightFill1" viewBox="0 0 270 270">
          <path
            fill="url(#meteoconsClearNightFill0)"
            stroke="#72b9d5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="6"
            d="M252.3 168.6A133.4 133.4 0 0 1 118 36.2A130.5 130.5 0 0 1 122.5 3A133 133 0 0 0 3 134.6C3 207.7 63 267 137.2 267c62.5 0 114.8-42.2 129.8-99.2a135.6 135.6 0 0 1-14.8.8Z"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="-15 135 135; 9 135 135; -15 135 135"
            />
          </path>
        </symbol>
      </defs>
      <use
        width="270"
        height="270"
        href="#meteoconsClearNightFill1"
        transform="translate(121 121)"
      />
    </svg>
  );
}
export default ClearNightFill;