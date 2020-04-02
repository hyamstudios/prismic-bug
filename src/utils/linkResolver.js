const linkResolver = ({ type, uid, filter, ...doc } = {}) => {
  const lang = (doc.lang || '').split('-')[0]

  // console.log('linkResolver', { type, uid, ...doc })

  switch (type) {
    case 'test':
      return `/${lang}/test`

    case 'news':
      return `/${lang}/news/${uid}`

    default:
      return `/${lang}/${uid}`
  }
}

module.exports = {
  linkResolver,
}
