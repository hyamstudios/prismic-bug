import React from 'react'
import { graphql } from 'gatsby'

export const query = graphql`
  query TextQuery($lang: String, $uid: String) {
    prismic {
      data: allTexts(uid: $uid, lang: $lang) {
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
            metaTitle: meta_title
            metaDescription: meta_description
            metaImage: meta_image
            title
            body
            photo
            photoSharp {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

export default (props) => {
  return (
    <div>
      <h1>Text</h1>
      <pre>{JSON.stringify(props.data.prismic, null, 2)}</pre>
    </div>
  )
}
