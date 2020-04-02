// import React from 'react'
import { registerLinkResolver } from 'gatsby-source-prismic-graphql'

import { linkResolver } from './src/utils/linkResolver'
// import { LocaleProvider } from './src/context/LocaleContext'
// import { getInitialLocale } from './src/translations/utils'

/**
 * We register `linkResolver` here for preview setup
 */
registerLinkResolver(linkResolver)

// eslint-disable-next-line import/prefer-default-export
// export const wrapRootElement = ({ element }) => {
//   const initialLocale = getInitialLocale()
//   return <LocaleProvider lang={initialLocale}>{element}</LocaleProvider>
// }

// export const onInitialClientRender = () => {
//   console.log('ReactDOM.render has executed')
//   Modal.setAppElement('#___gatsby')
// }
