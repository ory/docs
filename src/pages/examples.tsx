import React from 'react'
import ExampleList from '../components/Examples/example-list'
import * as content from './_assets/examples-content'
import Layout from '@theme/Layout'

const ExamplePage = () => {
  return (
    <Layout>
      <div style={{maxWidth:'1060px', margin:'auto'}}>
        <ExampleList {...content.official} />
        <ExampleList {...content.community} />
        <ExampleList {...content.selfhosted} />
      </div>
    </Layout>
  )
}

export default ExamplePage
