const fs = require('fs')
const fetch = require('node-fetch');

const services = [
  'hydra',
  'keto',
  'oathkeeper'
]

services.forEach((service) => {
  fetch(`https://api.github.com/repos/ory/${service}/releases`)
    .then((res) => res.json())
    .then((releases) => {
      const next = releases[0].tag_name
      const prev = releases[1].tag_name

      const path = `../docs/${service}/configure-deploy.md`
      return replace(
        path,
        (content) => content
          .replace(prev, next)
      )
        .then(() => Promise.resolve({ prev, next }))
    })
    .then(({ prev, next }) => {
      console.log(`Service ${service} documentation has been updated from version ${prev} ${next}`)
    })
    .catch((err) => {
        console.error((err))
        process.exit(1)
      }
    )
})

const replace = (path, replacer) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return reject(err)
    }

    fs.writeFile(path, replacer(data), 'utf8', (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
})
