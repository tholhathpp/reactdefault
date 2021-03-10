import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Link from 'gatsby-link'

const PerspectiveTemplate = (props) => {

    useEffect(() => handleComponentMounted());
    useEffect(() => handleComponentUpdated());
    const handleComponentMounted = () => {
        //console.log('handleComponentMounted');
    }
const handleComponentUpdated = () => {
    //console.log('handleComponentUpdated');
    }

    const siteMetadata = props.data.site.siteMetadata
    const currentPage = props.data.wpPerspective
    return (
        <Layout translations={currentPage.translated} lang={currentPage.locale.id}>
            <img src={currentPage.featuredImage.node.sourceUrl} height="400"/>
            <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
            <p>{currentPage.date} | {currentPage.news_feild.location}</p>
            <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
            
        </Layout>
    )
}


export default PerspectiveTemplate;

export const pageQuery = graphql`
    query currentPageQueryPers($id: String!) {
        wpPerspective(id: { eq: $id }) {
    date(formatString: "MMM D, Y")
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
        link
        sourceUrl
      }
    }
    translated {
      id
      localizedWpmlUrl
      locale {
        id
        locale
      }
      slug
      title
    }
  }
        site {
            id
            siteMetadata {
                title
            }
        }
    }
`