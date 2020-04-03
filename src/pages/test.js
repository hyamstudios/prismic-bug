import React from 'react';
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby';
import { get } from 'lodash';

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
`;

export default props => {
  const doc = get(props, 'data.prismic', null);

  if (!doc) {
    return null;
  }

  return (
    <div>
      <h1>Test</h1>
      <pre>{JSON.stringify(doc, null, 2)}</pre>
    </div>
  );
};
