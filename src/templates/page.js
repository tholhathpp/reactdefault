import React from 'react'
import Layout from '../components/layout'

const PageTemplate = (props) => {


    const siteMetadata = props.data.site.siteMetadata
    const currentPage = props.data.wpPage
    const translations = currentPage.translated
    return(
        <Layout translations={currentPage.translated} lang={currentPage.locale.id} >
            <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
            <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
        </Layout>
    )
}


export default PageTemplate ;

export const pageQuery = graphql`
    query currentPageQuery($id: String!) {
        wpPage(id: { eq: $id }) {
            title
            content
            slug
            id
            locale {
        id
        locale
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