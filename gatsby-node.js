const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)


exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({ fromPath: '/', toPath: '/en/home', redirectInBrowser: true, isPermanent: true })
  createRedirect({ fromPath: '/en/', toPath: '/en/home', redirectInBrowser: true, isPermanent: true })
  createRedirect({ fromPath: '/ar/', toPath: '/ar/home', redirectInBrowser: true, isPermanent: true })

  return new Promise((resolve, reject) => {

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWpPage {
            edges {
              node {
                id
                slug
                status
                title
                content
                localizedWpmlUrl
                locale {
                  id
                  locale
                }
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const pageTemplate = path.resolve("./src/templates/page.js")
        _.each(result.data.allWpPage.edges, edge => {
          var lang =
            createPage({
              path: edge.node.locale.id == "ar" ? `/ar/${edge.node.slug}/` : `/en/${edge.node.slug}/`,
              component: slash(pageTemplate),
              context: {
                id: edge.node.id,

              },
            })
        })

        // _.each(result.data.allWpPage.edges, edge => {
        //   var lang =
        //     createPage({
        //       path: edge.node.locale.id == "ar" ? `/ar/${edge.node.slug}/amp` : `/en/${edge.node.slug}/amp`,
        //       component: slash(pageTemplate),
        //       context: {
        //         id: edge.node.id,

        //       },
        //     })
        // })

      })


      // ==== END PAGES ====

      // ==== BLOG POSTS ====


      // .then(() => {
      //   graphql(`
      //       {
      //         allWpPerspective {
      //           edges {
      //             node {
      //               date(formatString: "MMM D, Y")
      //               title
      //               id
      //               content
      //               localizedWpmlUrl
      //               locale {
      //                 id
      //                 locale
      //               }
      //               translated {
      //                 id
      //                 localizedWpmlUrl
      //                 locale {
      //                   id
      //                   locale
      //                 }
      //                 slug
      //                 title
      //               }
      //               status
      //               slug
      //               news_feild {
      //                 location
      //                 summary
      //               }
      //               featuredImage {
      //                 node {
      //                   link
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     `).then(result => {
      //     if (result.errors) {
      //       console.log(result.errors)
      //       reject(result.errors)
      //     }

      //     const posts_en = result.data.allWpPerspective.edges.filter(node => node.node.locale.id == "en_US" || node.node.locale.id == "en")
      //     const postsPerPage = 2
      //     let numberOfPages = Math.ceil(posts_en.length / postsPerPage)
      //     const blogPostListTemplate = path.resolve('./src/templates/perspective-list.js')
      //     let lang = "en";
      //     Array.from({ length: numberOfPages }).forEach((page, index) => {
      //       createPage({
      //         component: slash(blogPostListTemplate),
      //         path: index === 0 ? '/en/perspective' : `/en/perspective/${index + 1}`,
      //         context: {
      //           posts: posts_en.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
      //           numberOfPages,
      //           lang,
      //           currentPage: index + 1
      //         }
      //       })
      //     })
      //     Array.from({ length: numberOfPages }).forEach((page, index) => {
      //       createPage({
      //         component: slash(blogPostListTemplate),
      //         path: index === 0 ? '/en/perspective/amp' : `/en/perspective/${index + 1}/amp`,
      //         context: {
      //           posts: posts_en.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
      //           numberOfPages,
      //           lang,
      //           currentPage: index + 1
      //         }
      //       })
      //     })

      //     const pageTemplate = path.resolve("./src/templates/perspective.js")
      //     _.each(posts_en, (post) => {
      //       createPage({
      //         path: `/en/perspective/${post.node.slug}`,
      //         component: slash(pageTemplate),
      //         context: {
      //           id: post.node.id,

      //         }
      //       })
      //     })
      //     const pageTemplate_amp_en = path.resolve("./src/templates/perspective.amp.js")
      //     _.each(posts_en, (post) => {
      //       createPage({
      //         path: `/en/perspective/${post.node.slug}/amp`,
      //         component: slash(pageTemplate_amp_en),
      //         context: {
      //           id: post.node.id,

      //         }
      //       })
      //     })


      //     const posts_ar = result.data.allWpPerspective.edges.filter(node => node.node.locale.id == "ar")
      //     numberOfPages = Math.ceil(posts_ar.length / postsPerPage)
      //     lang = "ar"
      //     Array.from({ length: numberOfPages }).forEach((page, index) => {
      //       createPage({
      //         component: slash(blogPostListTemplate),
      //         path: index === 0 ? '/ar/perspective' : `/ar/perspective/${index + 1}`,
      //         context: {
      //           posts: posts_ar.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
      //           numberOfPages,
      //           lang,
      //           currentPage: index + 1
      //         }
      //       })
      //     })

      //     Array.from({ length: numberOfPages }).forEach((page, index) => {
      //       createPage({
      //         component: slash(blogPostListTemplate),
      //         path: index === 0 ? '/ar/perspective/amp' : `/ar/perspective/${index + 1}/amp`,
      //         context: {
      //           posts: posts_ar.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
      //           numberOfPages,
      //           lang,
      //           currentPage: index + 1
      //         }
      //       })
      //     })

      //     _.each(posts_ar, (post) => {
      //       createPage({
      //         path: `/ar/perspective/${post.node.slug}`,
      //         component: slash(pageTemplate),
      //         context: {
      //           id: post.node.id,

      //         }
      //       })
      //     })

      //     _.each(posts_ar, (post) => {
      //       createPage({
      //         path: `/ar/perspective/${post.node.slug}/amp`,
      //         component: slash(pageTemplate_amp_en),
      //         context: {
      //           id: post.node.id,

      //         }
      //       })
      //     })

      //     resolve()
      //   })
      // })

      resolve()

      
  })
}