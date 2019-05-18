const fs = require('fs')
const oryOS = 'oryOS.11'
const hydra = 'v1.0.0-rc.13'
const oathkeeper = 'v0.15.3'
const keto = 'v0.3.2-sandbox'

const content = fs.readFileSync('../docs/ecosystem/versioning.md')

const lines = content.split('\n')

