import PropTypes from 'prop-types'
import React from 'react'
import { RichText, Date } from 'prismic-reactjs'

import { linkResolver } from './linkResolver'

// prop-types
export const structuredTextPropType = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    spans: PropTypes.array.isRequired,
  })
)

export const imagePropType = PropTypes.shape({
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  alt: PropTypes.oneOfType([PropTypes.string]),
  copyright: PropTypes.oneOfType([PropTypes.string]),
  url: PropTypes.string.isRequired,
})

export const imageSharpPropType = PropTypes.shape({
  childImageSharp: {
    fluid: {
      aspectRatio: 1.565217391304348,
      sizes: PropTypes.string,
      src: PropTypes.string,
      srcSet: PropTypes.string,
      srcSetWebp: PropTypes.string,
      srcWebp: PropTypes.string,
    },
  },
})

//  rendering
export const asText = data => {
  if (!data) {
    return null
  }
  return typeof data === 'string' ? data : RichText.asText(data)
}

export const renderer = data =>
  data ? <RichText render={data} linkResolver={linkResolver} /> : null

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export const renderDate = date => {
  if (!date) {
    return null
  }

  return Date(date).toLocaleDateString('en-GB', options)
}

// helpers
export const getPublicationDate = ({
  publicationDate,
  documentMeta: { firstPublicationDate },
}) => renderDate(publicationDate || firstPublicationDate)

export const getEventDate = ({ startDate, endDate }) => {
  if (!startDate) {
    return null
  }
  if (endDate) {
    return `${renderDate(startDate)} – ${renderDate(endDate)}`
  }
  return renderDate(startDate)
}
