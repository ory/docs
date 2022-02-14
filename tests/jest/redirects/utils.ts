import { readFileSync } from 'fs'
import axios from 'axios'
import { resolve } from 'path'
import { XMLParser } from 'fast-xml-parser'

const sitemapsDir = resolve(__dirname, '../sitemaps')

const parser = new XMLParser()

if (!process.env.TEST_HOST) {
  throw new Error('TEST_HOST env variable is not set')
}

export const oldAddress = 'https://www.ory.sh/'
export const newAddress = process.env.TEST_HOST.replace(/\/$/, '') +'/'

export type Sitemap = {
  urlset: {
    url: {
      loc: string
    }[]
  }
}

interface GetLoc {
  (url: string, replace?: [string, string]): Promise<{
    status: number,
    headers: { [k: string]: any },
    original: string,
    redirected: string,
    destination: string
  }>
}

export const getNewURL = (url: string, replace = [oldAddress, newAddress]): string => {
  return url.replace(replace[0], replace[1])
}

export const getLoc: GetLoc = async (url, replace = [oldAddress, newAddress]) => {
  const dest = getNewURL(url, replace)
  const res = await axios.get(dest)
  return {
    ...res,
    original: url,
    destination: dest,
    redirected: `${newAddress}${res.headers.location}`
  }
}

const ignoreUrls = [
]

export const readSitemapXML = (filename: string) => parser.parse(readFileSync(resolve(sitemapsDir, filename), 'utf8')).urlset.url.map(({ loc }) => [loc, getNewURL(loc)])
