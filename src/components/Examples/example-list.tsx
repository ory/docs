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
  repoLink: string
  tutorialLink?: string
  description?: string
}

const ExampleCard = ({
  title,
  language,
  framework,
  author,
  repoLink,
  tutorialLink
}: ExampleCard) => (
  <li>
  <div className={styles.examplecontainer}>
    <div>
      <img
        className={styles.img}
        src={'./img/examples/' + language + '.svg'}
      />
    </div>
    <div>
      <p className={styles.examplename}>{title}</p>
    </div>
    <div></div>
    <div>
      <p>
        by{' '}
        <a href={'https://github.com/' + author}>
          @{author}
        </a>
      </p>
    </div>
    <div></div>
    <div>
      {' '}
      <button
        className={styles.button}
        onClick={() => (location.href = `${repoLink}`)}
        type="button"
      >
        <img className={styles.buttonImg} src="./img/github.svg" />
        Code
      </button>{' '}
{/*       {tutorialLink.length > 1 && (
        <button
          className={styles.button}
          onClick={() =>
            (location.href = `${tutorialLink}`)
          }
          type="button"

          <img className={styles.buttonImg} src="./img/book.svg" />
          Docs
        </button>
      )}                > */}
    </div>
  </div>
</li>
)

const ExampleList = ({ examples, title, description }: PropTypes) => (
<div>
      <h1 className={styles.pageHeading}>{title}</h1>
      <h2>{description}</h2>
      <ul className={styles.wrapper}>
      {examples.map(( examples,index ) => (
              <div key="index"><ExampleCard {...examples}/></div>
          ))}
      </ul>
      </div>
)

export default ExampleList