import { JSX } from "solid-js";

export const DesertIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns-Xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1={35}
          x2={44}
          y1={41}
          y2={41}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stop-Color="#39bcc0" />
          <stop offset={1} stop-Color="#4bf9ff" />
        </linearGradient>
        <linearGradient
          x-linkHref="#linear-gradient"
          id="linear-gradient-2"
          x1={30}
          x2={39}
          y1={42.5}
          y2={42.5}
        />
        <linearGradient
          x-linkHref="#linear-gradient"
          id="linear-gradient-3"
          x1={20}
          x2={20}
          y2={3}
        />
        <linearGradient
          id="linear-gradient-4"
          x1={24}
          x2={24}
          y1={47}
          y2={38}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stop-Color="#fe9661" />
          <stop offset={1} stop-Color="#ffb369" />
        </linearGradient>
        <linearGradient
          x-linkHref="#linear-gradient"
          id="linear-gradient-5"
          x1={13}
          x2={3}
          y1={21}
          y2={21}
        />
        <linearGradient
          x-linkHref="#linear-gradient"
          id="linear-gradient-6"
          x1={19}
          x2={9}
          y1={11}
          y2={11}
          gradientTransform="matrix(-1 0 0 1 46 0)"
        />
        <style>{".cls-3{fill:#d7e9f7}"}</style>
      </defs>
      <g id="Desert">
        <path
          d="m35 44 .86-5.16a1 1 0 0 1 1-.84h5.3a1 1 0 0 1 1 .84L44 44Z"
          style={{
            fill: "url(#linear-gradient)",
          }}
        />
        <path
          d="m30 45 1.75-4.37a1 1 0 0 1 .93-.63h3.64a1 1 0 0 1 .93.63L39 45Z"
          style={{
            fill: "url(#linear-gradient-2)",
          }}
        />
        <path
          d="M16 6c-.55 0-.65-.23-2.27-1.86a1 1 0 0 1 1.41-1.41l1.57 1.56A1 1 0 0 1 16 6ZM24 6c.55 0 .65-.23 2.27-1.86a1 1 0 0 0-1.41-1.41l-1.57 1.56A1 1 0 0 0 24 6ZM7 15H5v-2a1 1 0 0 1 2 0ZM4 23H2a1 1 0 0 1 0-2h2ZM5 27H2a1 1 0 0 1 0-2h3ZM4 19H2a1 1 0 0 1 0-2h2ZM32 7h-2a1 1 0 0 1 0-2h2ZM36 7h2a1 1 0 0 0 0-2h-2ZM36 11h2a1 1 0 0 0 0-2h-2ZM36 15h2a1 1 0 0 0 0-2h-2ZM14 14h-2a1 1 0 0 1 0-2h2ZM14 9h-2a1 1 0 0 1 0-2h2ZM19 4V2a1 1 0 0 1 2 0v2ZM33 4V2a1 1 0 0 1 2 0v2ZM26 8h2a1 1 0 0 1 0 2h-2ZM26 22h2a1 1 0 0 1 0 2h-2ZM26 27h2a1 1 0 0 1 0 2h-2ZM26 32h2a1 1 0 0 1 0 2h-2ZM8 19h2a1 1 0 0 0 0-2H8Z"
          class="cls-3"
        />
        <path
          d="M27 41H13V10a7 7 0 0 1 14 0Z"
          style={{
            fill: "url(#linear-gradient-3)",
          }}
        />
        <path
          d="M47 47H1c0-5 7.72-9 17.25-9 6.21 0 11.66 1.71 14.69 4.29a20.73 20.73 0 0 1 3.52-.29C42.29 42 47 44.24 47 47Z"
          style={{
            fill: "url(#linear-gradient-4)",
          }}
        />
        <path
          d="M13 22v6H7a4 4 0 0 1-4-4v-7a3 3 0 0 1 6 0v5Z"
          style={{
            fill: "url(#linear-gradient-5)",
          }}
        />
        <path
          d="M27 13v6h6a4 4 0 0 0 4-4V6a3 3 0 0 0-6 0v7Z"
          style={{
            fill: "url(#linear-gradient-6)",
          }}
        />
        <path
          d="M39 36h-1a3 3 0 0 1 0-6h8a1 1 0 0 1 0 2h-8a1 1 0 0 0 0 2h1a1 1 0 0 1 0 2Z"
          class="cls-3"
        />
        <path
          d="M44 36h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM42 28h-9a3 3 0 0 1 0-6h1a1 1 0 0 1 0 2h-1a1 1 0 0 0 0 2h9a1 1 0 0 1 0 2Z"
          class="cls-3"
        />
        <path d="M39 24h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2Z" class="cls-3" />
      </g>
    </svg>
  );
};
