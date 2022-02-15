import { readFileSync } from 'fs'
import axios, { AxiosError } from 'axios'
import { resolve } from 'path'
import { XMLParser } from 'fast-xml-parser'
import axiosRetry from 'axios-retry';

const client = axios.create({ timeout: 2500 })
axiosRetry(client, { retries: 5, shouldResetTimeout: true });

const sitemapsDir = resolve(__dirname, '../sitemaps')

const parser = new XMLParser()

if (!process.env.TEST_HOST) {
  throw new Error('TEST_HOST env variable is not set')
}

export const oldAddress = 'https://www.ory.sh/'
export const newAddress = process.env.TEST_HOST.replace(/\/$/, '') + '/'

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
    destination: string,
    timeouted?: boolean
  }>
}

export const getNewURL = (url: string, replace = [oldAddress, newAddress]): string => {
  return url.replace(replace[0], replace[1])
}

export const getLoc: GetLoc = async (url, replace = [oldAddress, newAddress]) => {
  const dest = getNewURL(url, replace)
  const res = await client.get(dest,
    {
      headers: {
        'Accept': 'text/html'
      }
    }).catch((err: AxiosError) => {
      if (err.message.indexOf('timeout') > -1) {
        return {
          timeouted: true,
          status: 200,
          headers: {
            location: '/'
          }
        }
      }
      return Promise.reject(err)
  })
  return {
    status: res.status,
    headers: res.headers,
    original: url,
    destination: dest,
    redirected: `${newAddress}${res.headers.location}`
  }
}

const ignoreUrls = [
  'https://www.ory.sh/docs/search',
  'https://www.ory.sh/oathkeeper/docs/search',
  'https://www.ory.sh/keto/docs/search',
  'https://www.ory.sh/kratos/docs/search',
  'https://www.ory.sh/keto/docs/search',
  'https://www.ory.sh/kratos/docs/v0.1',
  'https://www.ory.sh/kratos/docs/v0.2',
  'https://www.ory.sh/kratos/docs/v0.4',
  'https://www.ory.sh/kratos/docs/v0.6/concepts/authenticators/look-up-secrets',
  'https://www.ory.sh/kratos/docs/v0.7/concepts/authenticators/look-up-secrets'
]

export const readSitemapXML = (filename: string) => parser.parse(readFileSync(resolve(sitemapsDir, filename), 'utf8')).urlset.url.filter(({ loc }) => !Boolean(ignoreUrls.findIndex((ignore) => ignore.indexOf(loc)))).map(({ loc }) => [loc, getNewURL(loc)])
