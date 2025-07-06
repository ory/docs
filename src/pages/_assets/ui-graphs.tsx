export const elementsArchitectureGraph = `flowchart LR
    subgraph ory[Ory Network]
        kratos@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on", label: "Identity Management" }
        hydra@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg", pos: "b", w: 120, constraint: "on", label: "OAuth2 & OpenID Connect Server" }
        keto@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg", pos: "b", w: 120, constraint: "on", label: "Permissions" }
        polis@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg", pos: "b", w: 120, constraint: "on", label: "Enterprise SSO bridge" }
    end
    subgraph app[Your Application]
        subgraph nextjs[Next.js]
            n@{ img: "/docs/img/examples/nextjs.svg", pos: "b", constraint: "on", h: 44, label: "Next.js" }
            n-->|Uses|react
            react@{ img: "/docs/img/examples/react.svg", pos: "b", constraint: "on", h: 44, label: "React" }
            elements@{ img: "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg", pos: "b", w: 120, constraint: "on", label: "Ory Elements" }
            react-->|Renders|elements
        end
        subgraph yourCode[Your Code]
            otherCode@{ shape: braces, label: "Your other code" }
            components@{ shape: braces, label: "Custom Components" }
        end

        elements-.->|Fetches UI description & updates flow states|kratos
        elements-.->|Fetches & Accepts OAuth2 consent|hydra

        react-->otherCode
    end
    otherCode-->|Checks session|kratos

    elements-.->|Renders|components
`

export const axArchitectureGraph = `flowchart LR
    subgraph ory[Ory Network]
        kratos@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on", label: "Identity Management" }
        hydra@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg", pos: "b", w: 120, constraint: "on", label: "OAuth2 & OpenID Connect Server" }
        keto@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg", pos: "b", w: 120, constraint: "on", label: "Permissions" }
        polis@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg", pos: "b", w: 120, constraint: "on", label: "Enterprise SSO bridge" }
        subgraph ax[Ory Account Experience]
            elements@{ img: "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg", pos: "b", w: 120, constraint: "on", label: "Ory Elements" }
        end
        
        ax-.->|Fetches UI description|kratos
        ax-.->|Fetches & Accepts OAuth2 consent|hydra
        elements-.->|Updates flow states|kratos
    end
    subgraph app[Your Application]
        yourCode@{ shape: braces, label: "Your code" }
    end
    app-->|Checks session|kratos
    app-->|Redirects to|ax
    ax-.->|Redirects to|app
`

export const customArchitectureGraph = `flowchart LR
    subgraph ory[Ory Network]
        kratos@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on", label: "Identity Management" }
        hydra@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg", pos: "b", w: 120, constraint: "on", label: "OAuth2 & OpenID Connect Server" }
        keto@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg", pos: "b", w: 120, constraint: "on", label: "Permissions" }
        polis@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg", pos: "b", w: 120, constraint: "on", label: "Enterprise SSO bridge" }
        
    end
    subgraph app[Your Application]
        direction TB
        yourCode@{ shape: braces, label: "Your code" }

        render-->|Fetches UI description|kratos
        render-->|Fetches consent challenge|hydra
        yourCode-->render
        render[[Renders your UI components]]
        render-->|Prompts for passkeys, passwords, or other credentials|formValidation
        formValidation[[Validates form data]]
        formValidation-->submit
        submit[[Submits data to Ory]]
        submit-->|Updates flow states|kratos
        submit-->|Accepts OAuth2 consent|hydra
    end
    yourCode-->|Checks session|kratos
`
