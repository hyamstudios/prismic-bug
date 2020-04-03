import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';

export const query = graphql`
  query NewsQuery($lang: String, $uid: String) {
    prismic {
      data: allNewss(uid: $uid, lang: $lang) {
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
            author
            type
            body
            photo
            photoSharp {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            eventDate: event_date
            eventAddress: event_address
          }
        }
      }
    }
  }
`;

export default props => {
  const doc = get(props, 'data.prismic', null);

  if (!doc) {
    return null;
  }

  return (
    <div>
      <h1>News</h1>
      <pre>{JSON.stringify(doc, null, 2)}</pre>
    </div>
  );
};
