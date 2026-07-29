// sidebars-agentic.ts
const agenticSidebar = [
  {
    type: "category",
    label: "Agentic IAM",
    items: [
      "solutions/solution-agentic",
      {
        type: "category",
        label: "Ory Agent DX",
        link: {
          type: "doc",
          id: "solutions/agent-dx/overview",
        },
        items: [
          "solutions/agent-dx/install",
          "solutions/agent-dx/local-stack",
          "solutions/agent-dx/scaffold-auth",
          "solutions/agent-dx/integrations",
          "solutions/agent-dx/mcp-server",
        ],
      },
    ],
  },
]

export default agenticSidebar
