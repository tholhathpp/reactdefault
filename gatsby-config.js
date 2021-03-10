require("dotenv").config()
/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

module.exports = {
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,

      options: {

        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `https://dev-gatsby-tholha.pantheonsite.io/graphql`,
        // auth: {
        //   htaccess: {
        //     username: "admin",
        //     password: "admin",
        //   }
        // }
      },
      includedRoutes: [
        // '/*/*/categories',
        '/*/*/posts',
        '/*/*/pages',
        '/*/*/media',
        // '/*/*/tags',
        // '/*/*/taxonomies',
        // '/*/*/users',
        '/*/*/menus'
      ],
    },
    {
      resolve: `gatsby-plugin-amp`,
      options: {

        canonicalBaseUrl: 'http://localhost:9000/',
        components: ['amp-img'],
        excludedPaths: ['/404*'],
        pathIdentifier: '/amp',
        relAmpHtmlPattern: '{{ canonicalBaseUrl }}{{ pathname }}{{ pathIdentifier }}',

      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    },
    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter WordPress Blog`,
        short_name: `GatsbyJS & WP`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby BoilerPlate`,
        short_name: `Gatsby`,
        start_url: `/en/home`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/favicon.png`,
      },
    },
    `gatsby-plugin-offline`

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    // `gatsby-plugin-offline`,
  ],
}
