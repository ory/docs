const fs = require('fs');

const file = require('./examples/schemas/schema.json');

const writeEnum = (property) => {
    return property.enum ? property.enum.join(', ') : '';
}

const repeat = (val, n) => val.repeat(n);

const optionalWrite = attr => attr ? attr : '-';

const isRequired = (req, prop) => Array.isArray(req) ? (req.includes(prop) ? 'yes' : 'no') : '?';

const writeProperties = (o, prefix) => {
    const keys = Object.keys(o.properties);

    const output = keys.map(key => {
        let mapped =             `
      <tr>
        <td title="${o.properties[key].description}">${prefix}${key}</td>
        <td>${o.properties[key].type}</td>
        <td>${optionalWrite(o.properties[key].minLength)}</td>
        <td>${optionalWrite(o.properties[key].maxLength)}</td>
        <td>${optionalWrite(o.properties[key].pattern)}</td>
        <td>${writeEnum(o.properties[key])}</td>
        <td>${isRequired(o.required, key)}</td>
      </tr>
      `

        if (o.properties[key].properties) {
            mapped += writeProperties(o.properties[key], repeat('&nbsp', 1)).join('\n');
        }

        return mapped
    });

    return output
}

const headers = `
<tr>
    <th>Property</th>
    <th>Type</th>
    <th>Min Length</th>
    <th>Max Length</th>
    <th>Pattern</th>
    <th>Values</th>
    <th>Required</th>
</tr>
`

const rows = writeProperties(file, '').join('\n')

fs.writeFileSync('output.html', '<table>' + headers + rows + '</table>');