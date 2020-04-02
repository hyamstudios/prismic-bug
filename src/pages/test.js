import React from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const query = graphql`
  query TestQuery($lang: String) {
    prismic {
      data: allTests(lang: $lang) {
        edges {
          node {
            meta: _meta {
              id
              type
              uid
              lang
              alternateLanguages {
                uid
                lang
                type
              }
            }
            title
          }
        }
      }
    }
  }
`

const Test = (props) => {
  // const data = get(props, 'data.prismic.data.edges[0].node')

  console.log(props)

  return (
    <div>
      <h1>Test Page</h1>
      <pre>{JSON.stringify(props.data.prismic, null, 2)}</pre>
    </div>
  )
}

export default Test
