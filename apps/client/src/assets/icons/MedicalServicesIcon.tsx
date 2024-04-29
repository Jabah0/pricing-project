import type { JSX } from "solid-js";

export function MedicalServicesIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <mask id="lineMdMedicalServicesFilled0">
        <g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2">
          <path
            stroke-dasharray="16"
            stroke-dashoffset="16"
            d="M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7"
            opacity="0"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.7s"
              dur="0.2s"
              values="16;32"
            />
            <set attributeName="opacity" begin="0.7s" to="1" />
          </path>
          <path
            fill="#fff"
            fill-opacity="0"
            stroke-dasharray="64"
            stroke-dashoffset="64"
            d="M9 7H20C20.5523 7 21 7.44772 21 8V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V8C3 7.44772 3.44772 7 4 7z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="64;0"
            />
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.7s"
              dur="0.5s"
              values="0;1"
            />
          </path>
          <g stroke="#000" stroke-dasharray="8" stroke-dashoffset="8">
            <path d="M12 11v6" opacity="0">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="1.0s"
                dur="0.2s"
                values="8;0"
              />
              <set attributeName="opacity" begin="1.0s" to="1" />
            </path>
            <path d="M9 14h6" opacity="0">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="1.2s"
                dur="0.2s"
                values="8;0"
              />
              <set attributeName="opacity" begin="1.2s" to="1" />
            </path>
          </g>
        </g>
      </mask>
      <rect
        width="24"
        height="24"
        fill="currentColor"
        mask="url(#lineMdMedicalServicesFilled0)"
      />
    </svg>
  );
}
