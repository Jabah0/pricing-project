import type { JSX } from 'solid-js'

export function PrimeChevronUp(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M17 15.25a.74.74 0 0 1-.53-.22L12 10.56L7.53 15a.75.75 0 0 1-1.06-1l5-5a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.19"/></svg>
  )
}
export default PrimeChevronUp