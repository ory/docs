import "../styles/globals.css"

// Use any because of React 18 breaking change: https://github.com/vercel/next.js/issues/36019
export default function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}
