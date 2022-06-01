import React from 'react'
import ExampleList from '../components/Examples/example-list'
import * as content from './_assets/examples-content'
import Layout from '@theme/Layout'

const ExamplePage = () => {
  return (
    <Layout>
    <div>
      <ExampleList {...content.official} />
      <ExampleList {...content.community} />
      <ExampleList {...content.selfhosted} />
    </div>
    </Layout>
  )
}

export default ExamplePage
