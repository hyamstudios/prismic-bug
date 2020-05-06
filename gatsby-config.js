const config = require('./config');

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = config.siteMetadata.siteUrl,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl,
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    author: config.siteMetadata.author,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        useResolveUrlLoader: true,
      },
    },
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-purgecss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-image',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: config.cms.prismicRepoName,
        defaultLang: config.cms.defaultLang,
        langs: config.cms.langs,
        // shortenUrlLangs: true,
        path: '/preview',
        previews: true,
        /**
         * The setup below renders only INTERNAL PREVIEW links
         * Pages used for the public website is created in `gatsby-node.js`
         * Make sure the `typesNeedUnpublishedPagePreview` in `src/prismic/linkResolver.js` is in sync with the options below.
         * Please do not add Single Type here as they usually are already published and you cannot create multiple instances for those types.
         */
        pages: [
          {
            type: 'News',
            match: '/:lang?/news/:uid',
            previewPath: '/news',
            path: '/news',
            component: require.resolve('./src/templates/news.js'),
            langs: config.cms.langs,
          },
          {
            type: 'Text',
            match: '/:lang?/:uid',
            previewPath: '/text',
            path: '/text',
            component: require.resolve('./src/templates/text.js'),
            langs: config.cms.langs,
          },
        ],
        sharpKeys: [/image|photo|picture|logo/],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteMetadata.title,
        short_name: config.siteMetadata.shortName,
        start_url: '/',
        background_color: '#000',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/images/svg`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [
          '/preview',
          '/preview/**/*',
          '/internal-preview',
          '/internal-preview/**/*',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*.js': [
            'Cache-Control: public, max-age=0, must-revalidate',
            'Content-Type: text/javascript',
          ],
        },
        mergeLinkHeaders: false,
        mergeCachingHeaders: false,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#000',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          master: {
            policy: [{ userAgent: '*' }],
          },
          staging: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
  ],
};
