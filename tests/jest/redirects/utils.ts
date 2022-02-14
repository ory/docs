import https from 'https'
import { readFileSync } from 'fs'
import axios from 'axios'
import { resolve, basename } from 'path'
import { XMLParser } from 'fast-xml-parser'

const sitemapsDir = resolve(__dirname, '../sitemaps')

const parser = new XMLParser()

export const oldAddress = 'https://www.ory.sh/'
export const newAddress = 'http://localhost:6000/'

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
    redirected: `${newAddress}${res.headers.location}`,
  }
}

export const readSitemapXML = (filename: string) => parser.parse(readFileSync(resolve(sitemapsDir, filename), 'utf8'))

export const maxTimeout = 30000
