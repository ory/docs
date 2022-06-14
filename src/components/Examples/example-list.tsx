import React from 'react'
import styles from './example-list.module.css'

export interface PropTypes {
  title?
  description?
  examples: Array<ExampleCard>
}

interface ExampleCard {
  title: string
  language: string
  framework?: string
  author: string
  tested: boolean
  repo: string
  docs?: string
  description?: string
}

const ExampleCard = ({
  title,
  language,
  framework,
  author,
  repo,
  docs
}: ExampleCard) => (
  <li>
    <div className={styles.container}>
      <div>
        <img
          className={styles.img}
          src={'./img/examples/' + language + '.svg'}
        />
      </div>
      <div>
        <p className={styles.title}>{title}</p>
      </div>
      <div></div>
      <div>
        <p>
          by <a href={'https://github.com/' + author}>@{author}</a>
        </p>
      </div>
      <div></div>
      <div>
        {' '}
        <button
          className={styles.button}
          onClick={() => (location.href = `${repo}`)}
          type="button"
        >
          <img className={styles.buttonImg} src="./img/github.svg" />
          Code
        </button>
        {docs && (
          <button
            className={styles.button}
            onClick={() => (location.href = `${docs}`)}
            type="button"
          >
            <img className={styles.buttonImg} src="./img/book.svg" />
            Docs
          </button>
        )}
      </div>
    </div>
  </li>
)

const ExampleList = ({ examples, title, description }: PropTypes) => (
  <div>
    <div className={styles.header}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    <ul className={styles.wrapper}>
      {examples.map((examples, index) => (
        <div key="index">
          <ExampleCard {...examples} />
        </div>
      ))}
    </ul>
  </div>
)

export default ExampleList
