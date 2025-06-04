import React from "react"

type ConfigOption = {
  name: string
  type: string
  default?: string
  description: string
}

type ConfigurationOptionsTableProps = {
  options: ConfigOption[]
}

/**
 * A component for displaying configuration options in a standardized format
 */
export const ConfigurationOptionsTable: React.FC<
  ConfigurationOptionsTableProps
> = ({ options }) => {
  return (
    <div className="configuration-options-table">
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => (
            <tr key={index}>
              <td>
                <code>{option.name}</code>
              </td>
              <td>
                <code>{option.type}</code>
              </td>
              <td>{option.default ? <code>{option.default}</code> : "-"}</td>
              <td>{option.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ConfigurationOptionsTable
