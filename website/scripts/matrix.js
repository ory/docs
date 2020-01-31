const fs = require('fs');
const fetch = require('node-fetch');

const findLine = (oryOS, lines) => {
  const oos = '| `' + oryOS + '`';
  let index = -1;
  let content = lines.find((line, k) => {
    if (line.slice(0, oos.length) === oos) {
      index = k;
      return true;
    }
    return false;
  });

  if (index === -1) {
    const oos2 = '| oryOS ';
    lines.find((line, k) => {
      if (line.slice(0, oos2.length) === oos2) {
        index = k + 2;
        return true;
      }
      return false;
    });

    content = `${oos} ${oos} | | | |`;
    lines.splice(index, 0, content);
  }

  if (index === -1) {
    console.error('Could not find new index either');
  }

  return {
    index,
    content,
    lines,
  };
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const versions = (
  oryOS,
  { index, lines },
  { hydra, keto, oathkeeper, kratos }
) => {
  const columns = lines[index].split('|'); // hydra:3, keto:4, oathkeeper:5, kratos:6
  const versions = [hydra, keto, oathkeeper, kratos]; // 3,4,5,6 index
  const updated = columns
    .slice(3, 7)
    .map((column, index) =>
      versions[index]
        ? [
            ...column
              .split(',')
              .map(v => v.trim())
              .filter(p => p.length > 0),
            '`' + versions[index] + '`',
          ].filter(onlyUnique)
        : column.split(',').filter(onlyUnique)
    )
    .map(inner => {
      return inner.join(', ');
    });

  const os = '`' + oryOS + '`';

  lines[index] = `| ${os} | ${os} | ${updated.join(' | ')} |`;
  return lines;
};

const path = '../docs/ecosystem/versioning.md';
const content = fs
  .readFileSync(path)
  .toString()
  .split('\n');

const services = ['hydra', 'keto', 'oathkeeper', 'kratos']; // this needs to match the order in the version.md file.
Promise.all(
  services.map(service =>
    fetch(
      `https://${
        process.env.GITHUB_TOKEN ? `aeneasr:${process.env.GITHUB_TOKEN}@` : ''
      }api.github.com/repos/ory/${service}/releases`
    )
      .then(res => res.json())
      .then(releases => Promise.resolve(releases))
      .catch(err => {
        console.error(err);
        process.exit(1);
      })
  )
).then(serviceVersions => {
  let lines = content;

  const hydra = serviceVersions[0];
  hydra
    .filter(({ name }) => name.indexOf('+') > -1)
    .forEach(version => {
      const oryOS = version.name.split('+')[1];
      lines = versions(oryOS, findLine(oryOS, lines), {
        hydra: version.name.split('+')[0],
      });
    });

  const keto = serviceVersions[1];
  keto
    .filter(({ name }) => name.indexOf('+') > -1)
    .forEach(version => {
      const oryOS = version.name.split('+')[1];
      lines = versions(oryOS, findLine(oryOS, lines), {
        keto: version.name.split('+')[0],
      });
    });

  const oathkeeper = serviceVersions[2];
  oathkeeper
    .filter(({ name }) => name.indexOf('+') > -1)
    .forEach(version => {
      const oryOS = version.name.split('+')[1];
      lines = versions(oryOS, findLine(oryOS, lines), {
        oathkeeper: version.name.split('+')[0],
      });
    });

  const kratos = serviceVersions[3];
  kratos
    .filter(({ name }) => name.indexOf('+') > -1)
    .forEach(version => {
      const oryOS = version.name.split('+')[1];
      lines = versions(oryOS, findLine(oryOS, lines), {
        kratos: version.name.split('+')[0],
      });
    });

  fs.writeFileSync(path, lines.join('\n'));
});
