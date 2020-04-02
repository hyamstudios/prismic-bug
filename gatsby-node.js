const fs = require('fs')
const path = require('path')
const { linkResolver } = require('./src/utils/linkResolver')
// const { newsTypes, archiveFilters } = require('./src/utils/filters')

// ========= workaround for bug https://github.com/birkir/gatsby-source-prismic-graphql/issues/162
const dir = './.cache/caches/gatsby-source-prismic-graphql'
exports.onPreBootstrap = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
// =========

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const templates = {
    news: path.resolve(`src/templates/news.js`),
    text: path.resolve(`src/templates/text.js`),
    test: path.resolve(`src/pages/test.js`),
  }

  const fetchDocs = async (context = {}) => {
    const result = await graphql(
      `
        query NodeQuery($endCursor: String) {
          prismic {
            documents: _allDocuments(after: $endCursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  meta: _meta {
                    id
                    uid
                    type
                    lang
                  }
                }
              }
            }
          }
        }
      `,
      context
    ).then((response) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(response), 1000)
      })
    })

    if (result.errors) {
      throw new Error(result.errors)
    }

    return result.data.prismic.documents
  }

  let counter = 0
  const fetchAllDocs = async (context) => {
    const results = await fetchDocs(context)
    counter += 1
    console.log('Fetching data from Prismic for page ', counter)

    if (results.pageInfo.hasNextPage) {
      return results.edges.concat(await fetchAllDocs(results.pageInfo))
    }

    return results.edges
  }

  const allDocs = await fetchAllDocs()

  // const documents = result.data.prismic.documents.edges
  allDocs.forEach(({ node }) => {
    if (templates[node.meta.type]) {
      createPage({
        path: linkResolver(node.meta),
        component: templates[node.meta.type],
        context: { ...node.meta },
      })
    }
  })
}
