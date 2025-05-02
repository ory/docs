import React from "react"

type ErrorEntry = {
  code: string | number
  description: string
  solution: string
}

type CommonErrorsTableProps = {
  errors: ErrorEntry[]
}

/**
 * A component for displaying common errors and their solutions
 */
export const CommonErrorsTable: React.FC<CommonErrorsTableProps> = ({
  errors,
}) => {
  return (
    <div className="common-errors-table">
      <table>
        <thead>
          <tr>
            <th>Error Code</th>
            <th>Description</th>
            <th>Solution</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error, index) => (
            <tr key={index}>
              <td>
                <code>{error.code}</code>
              </td>
              <td>{error.description}</td>
              <td>{error.solution}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommonErrorsTable
