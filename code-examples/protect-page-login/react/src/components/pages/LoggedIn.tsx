// TODO add logout button and session information

export default function LoggedIn() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome to the
              <a
                className="link link-primary"
                target="_blank"
                href="https://www.ory.sh/docs/welcome"
                rel="noreferrer"
              >
                Ory
              </a>{" "}
              +{" "}
              <a
                className="link link-primary"
                target="_blank"
                href="https://vitejs.dev/"
                rel="noreferrer"
              >
                Vite
              </a>{" "}
              +{" "}
              <a
                className="link link-primary"
                target="_blank"
                href="https://reactjs.org/"
                rel="noreferrer"
              >
                React
              </a>{" "}
              +{" "}
              <a
                className="link link-primary"
                target="_blank"
                href="https://www.typescriptlang.org/"
                rel="noreferrer"
              >
                TypeScript
              </a>{" "}
              +{" "}
              <a
                className="link link-primary"
                target="_blank"
                href="https://tailwindcss.com/"
                rel="noreferrer"
              >
                TailwindCSS
              </a>{" "}
              Starter
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}
