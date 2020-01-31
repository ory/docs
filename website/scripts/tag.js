const fs = require('fs');
const fetch = require('node-fetch');

const services = ['hydra', 'keto', 'oathkeeper', 'kratos'];

services.forEach(service => {
  fetch(
    `https://${
      process.env.GITHUB_TOKEN ? `aeneasr:${process.env.GITHUB_TOKEN}@` : ''
    }api.github.com/repos/ory/${service}/releases`
  )
    .then(res => res.json())
    .then(releases => {
      const next = releases[0].tag_name;

      const path = `../docs/${service}/configure-deploy.md`;
      return replace(path, content => {
        if (service === 'hydra') {
          return content
            .replace(
              new RegExp(`oryd/${service}:v[0-9a-zA-Z\\.\\+\\_\\-]+`, 'g'),
              `oryd/${service}:${next}`
            )
            .replace(
              new RegExp(
                `oryd/hydra-login-consent-node:v[0-9a-zA-Z\\.\\+\\_\\-]+`,
                'g'
              ),
              `oryd/hydra-login-consent-node:${next}`
            );
        } else {
          return content.replace(
            new RegExp(`oryd/${service}:v[0-9a-zA-Z\\.\\+\\_\\-]+`, 'g'),
            `oryd/${service}:${next}`
          );
        }
      }).then(() => Promise.resolve({ next }));
    })
    .then(({ prev, next }) => {
      console.log(
        `Service ${service} documentation has been updated to version ${next}`
      );
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});

const replace = (path, replacer) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      fs.writeFile(path, replacer(data), 'utf8', err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
