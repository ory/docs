import React from "react"
import "./ory-network-cta.css"

const ctaVariants = [
  {
    title: "Ory Network",
    content: (
      <>
        Enable your instant-on global identity system with speed, security,
        compliance and support for fastest time to value and lowest total cost
        of ownership.
      </>
    ),
    cta: "Learn more",
    href: "https://www.ory.sh/network/?mtm_campaign=Docs-SideCta&mtm_kwd=variant-0",
  },
]

export const OryNetworkCta = () => {
  const { cta, content, title, href } = ctaVariants[0]

  return (
    <div className="bg-cyan-950 hidden p-6 flex-col items-center rounded-lg mt-4 xl:flex">
      <div className="lg:p-6">
        <Logo className="max-w-20 lg:max-w-32" />
      </div>
      <div className="flex flex-col gap-2d">
        <h3 className="text-white text-xl font-semibol">{title}</h3>
        <p className="text-gray-100 text-sm lg:text-base">{content}</p>
        <a
          href={href}
          target="_blank"
          className="font-bold text-white hover:text-gray-50"
        >
          {cta}
        </a>
      </div>
    </div>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 206 239"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M103.09 1V119.366M103.09 119.366L1 178.548M103.09 119.366L205.181 178.548"
        stroke="#67E8F9"
        stroke-width="1.275"
        stroke-linejoin="round"
      />
      <path
        opacity="0.6"
        d="M205.181 60.1828L103.09 1L1 60.1828V178.548L103.09 237.731L205.181 178.548V60.1828Z"
        fill="#155E75"
      />
      <path
        d="M103.089 72.0547V123.055M103.089 123.055L59.1016 148.555M103.089 123.055L147.077 148.555"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        opacity="0.6"
        d="M147.077 97.5547L103.089 72.0547L59.1016 97.5547V148.555L103.089 174.055L147.077 148.555V97.5547Z"
        fill="#A5F3FC"
      />
      <path
        d="M147.077 97.5547L103.089 72.0547L59.1016 97.5547M147.077 97.5547L103.089 123.055M147.077 97.5547V148.555L103.089 174.055M103.089 123.055L59.1016 97.5547M103.089 123.055V174.055M59.1016 97.5547V148.555L103.089 174.055"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        d="M54.6379 100.102V151.102M54.6379 151.102L10.6504 176.602M54.6379 151.102L98.6254 176.602"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        opacity="0.6"
        d="M98.6254 125.602L54.6379 100.102L10.6504 125.602V176.602L54.6379 202.102L98.6254 176.602V125.602Z"
        fill="#A5F3FC"
      />
      <path
        d="M98.6254 125.602L54.6379 100.102L10.6504 125.602M98.6254 125.602L54.6379 151.102M98.6254 125.602V176.602L54.6379 202.102M54.6379 151.102L10.6504 125.602M54.6379 151.102V202.102M10.6504 125.602V176.602L54.6379 202.102"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        d="M151.537 100.102V151.102M151.537 151.102L107.55 176.602M151.537 151.102L195.525 176.602"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        opacity="0.6"
        d="M195.525 125.602L151.537 100.102L107.55 125.602V176.602L151.537 202.102L195.525 176.602V125.602Z"
        fill="#A5F3FC"
      />
      <path
        d="M195.525 125.602L151.537 100.102L107.55 125.602M195.525 125.602L151.537 151.102M195.525 125.602V176.602L151.537 202.102M151.537 151.102L107.55 125.602M151.537 151.102V202.102M107.55 125.602V176.602L151.537 202.102"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        d="M103.089 128.156V179.156M103.089 179.156L59.1016 204.656M103.089 179.156L147.077 204.656"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        opacity="0.6"
        d="M147.077 153.656L103.089 128.156L59.1016 153.656V204.656L103.089 230.156L147.077 204.656V153.656Z"
        fill="#A5F3FC"
      />
      <path
        d="M147.077 153.656L103.089 128.156L59.1016 153.656M147.077 153.656L103.089 179.156M147.077 153.656V204.656L103.089 230.156M103.089 179.156L59.1016 153.656M103.089 179.156V230.156M59.1016 153.656V204.656L103.089 230.156"
        stroke="#06B6D4"
        stroke-width="0.6375"
        stroke-linejoin="round"
      />
      <path
        d="M10.6504 116.536L103.088 62.9492L195.525 116.536"
        stroke="#155E75"
        stroke-width="0.6375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M103.088 12.0547V62.9484"
        stroke="#155E75"
        stroke-width="0.6375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g opacity="0.6">
        <path
          d="M103.088 170.122L10.6504 116.535H195.525L103.088 170.122Z"
          fill="#22D3EE"
        />
        <path
          d="M10.6504 116.534V65.6406L195.525 65.6406V116.534H10.6504Z"
          fill="#22D3EE"
        />
        <path
          d="M195.525 65.6416L103.088 12.0547L10.6504 65.6417L195.525 65.6416Z"
          fill="#22D3EE"
        />
      </g>
      <path
        d="M10.6504 116.535L103.088 170.122L195.525 116.535"
        stroke="#155E75"
        stroke-width="0.6375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M103.088 119.227V170.12"
        stroke="#155E75"
        stroke-width="0.6375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.6504 65.6406V116.534M195.525 116.534V65.6406"
        stroke="#155E75"
        stroke-width="0.6375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M103.088 12.0547L195.525 65.6416L103.088 119.229L10.6504 65.6417L103.088 12.0547Z"
        stroke="#155E75"
        stroke-width="0.6375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M205.181 60.1828L103.09 1L1 60.1828M205.181 60.1828L103.09 119.366M205.181 60.1828V178.548L103.09 237.731M103.09 119.366L1 60.1828M103.09 119.366V237.731M1 60.1828V178.548L103.09 237.731"
        stroke="#0891B2"
        stroke-width="1.275"
        stroke-linejoin="round"
      />
    </svg>
  )
}
