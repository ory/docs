import logoutCode from '@site/src/theme/logoutCode'
export const apiFlow = {
  curl: {
    label: 'curl',
    language: 'shell',
    code: require('raw-loader!./samples/api/curl.txt').default
  },
  go: {
    label: 'Go',
    language: 'go',
    code: logoutCode
  }
}
export const browserFlow = {
  node: {
    label: 'NodeJS (ExpressJS, ...)',
    language: 'js',
    code: require('raw-loader!./samples/browser/node.txt').default
  }
}
