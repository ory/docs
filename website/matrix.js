const fs = require('fs');
const fetch = require('node-fetch');
const oryOS = process.argv[2];

const findLine = lines => {
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

const versions = ({ index, lines }, { hydra, keto, oathkeeper }) => {
  const columns = lines[index].split('|'); // hydra:3, keto:4, oathkeeper:5
  const versions = [hydra, keto, oathkeeper]; // 3,4,5 index
  const updated = columns
    .slice(3, 6)
    .map((column, index) =>
      versions[index]
        ? [
            ...column
              .split(',')
              .map(v => v.trim())
              .filter(p => p.length > 0),
            '`' + versions[index] + '`',
          ].filter(onlyUnique)
        : column
    )
    .map(inner => inner.join(', '));

  const os = '`' + oryOS + '`';

  lines[index] = `| ${os} | ${os} | ${updated.join(' | ')} |`;
  return lines;
};

const path = '../docs/ecosystem/versioning.md';
const content = findLine(
  fs
    .readFileSync(path)
    .toString()
    .split('\n'),
  '| `' + oryOS + '`'
);

const services = ['hydra', 'keto', 'oathkeeper']; // this needs to match the order in the version.md file.
Promise.all(
  services.map(service =>
    fetch(
      `https://aeneasr:${
        process.env.GITHUB_TOKEN
      }@api.github.com/repos/ory/${service}/releases`
    )
      .then(res => res.json())
      .then(releases => Promise.resolve(releases[0].tag_name))
      .catch(err => {
        console.error(err);
        process.exit(1);
      })
  )
).then(serviceVersions => {
  const lines = versions(content, {
    hydra: serviceVersions[0],
    keto: serviceVersions[1],
    oathkeeper: serviceVersions[2],
  });

  fs.writeFileSync(path, lines.join('\n'));
});
