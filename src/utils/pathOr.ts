export const pathOr = (defaultValue, path, obj) => {
  return path.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue),
    obj,
  )
}
