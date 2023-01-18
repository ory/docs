// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const namespace = {
  pattern: /[a-zA-Z0-9-_]+:/,
  inside: {
    delimiter: /:/,
    namespace: /[a-zA-Z0-9-_]+/,
  },
}

const object = {
  pattern: /[a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+/,
  inside: {
    namespace,
    id: /.*/, // everything else that is not the namespace
  },
}

const relation = {
  pattern: /[a-zA-Z0-9-_]+ o[fn] /,
  inside: {
    delimiter: / o[fn] /,
  },
}

const relationAndObject = {
  pattern: /[a-zA-Z0-9-_]+ o[fn] [a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+/,
  inside: {
    relation,
    object,
  },
}

const relationSubject = {
  pattern: /\(?([a-zA-Z0-9-_]+ o[fn] )?[a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+\)? is /,
  inside: {
    delimiter: /( is )|[()]/,
    // we first try to match relationAndObject, if that fails we match object
    "": relationAndObject,
    object,
  },
}

const permissionSubject = {
  pattern: /is \(?([a-zA-Z0-9-_]+ o[fn] )?[a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+\)?/,
  inside: {
    delimiter: /(is )|[()]/,
    // we first try to match relationAndObject, if that fails we match object
    "": relationAndObject,
    object,
  },
}

export default (prism) => {
  prism.languages["keto-relationships"] = {
    comment: /\/\/.*(\n|$)/,
    relationship: {
      pattern:
        /\(?([a-zA-Z0-9-_]+ o[fn] )?[a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+\)? is [a-zA-Z0-9-_]+ o[fn] [a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+/,
      inside: {
        subject: relationSubject,
        "": relationAndObject,
      },
    },
    "permission-question": {
      pattern:
        /is \(?([a-zA-Z0-9-_]+ o[fn] )?[a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+\)? allowed to [a-zA-Z0-9-_]+ o[fn] [a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+\??/,
      inside: {
        delimiter: /( allowed to )|\?/,
        subject: permissionSubject,
        "": relationAndObject,
      },
    },
  }
}
