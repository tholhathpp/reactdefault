const pagePath = `content`
const indexName = `Pages`
const pageQuery = `{
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
}`
function pageToAlgoliaRecord({ node: { id, slug, status, title, content, localizedWpmlUrl, locale} }) {
    return {
        objectID: id,
        slug: locale.id == "en_US" ? "/en/"+slug : "/ar/"+slug,
        status: status,
        title: title,
        content: content,
        localizedWpmlUrl: localizedWpmlUrl,
        lang: locale.id=="en_US"?"en":"ar",
        type:"page"
    }
}

//perspective
const perspectiveQuery = `{
  allWpPerspective {
                edges {
                  node {
                    date(formatString: "MMM D, Y")
                    dateTimestamp:date
                    title
                    id
                    content
                    localizedWpmlUrl
                locale {
                  id
                  locale
                }
                status
                    slug
                    news_feild {
                      location
                      summary
                    }
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
}`
function perspectiveToAlgoliaRecord({ node: { id, slug, status, title, content, localizedWpmlUrl, locale, news_feild, featuredImage, date, dateTimestamp } }) {
    return {
        objectID: id,
        slug: locale.id == "en_US" ? "/en/perspective/" + slug : "/ar/perspective/" + slug,
        status: status,
        title: title,
        content: content,
        localizedWpmlUrl: localizedWpmlUrl,
        lang: locale.id == "en_US" ? "en" : "ar",
        type: "perspective",
        date:date,
        location: news_feild.location,
        summary: news_feild.summary,
        image: featuredImage.node.sourceUrl,
        dateTimestamp: Date.parse(dateTimestamp)/1000
    }
}

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }) => data.allWpPage.edges.map(pageToAlgoliaRecord),
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    }, 
    {
        query: perspectiveQuery,
        transformer: ({ data }) => data.allWpPerspective.edges.map(perspectiveToAlgoliaRecord),
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]
module.exports = queries