import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState, useEffect } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import { ThemeProvider } from "styled-components"
import StyledSearchBox from "./styled-search-box"
import StyledSearchResult from "./styled-search-result"
import StyledSearchRoot from "./styled-search-root"
import useClickOutside from "./use-click-outside"
import { navigate } from "@reach/router"  
import queryString from 'query-string'


const theme = {
    foreground: "#050505",
    background: "white",
    faded: "#888",
}

export default function Search({ indices,location }) {
    const rootRef = createRef()
    const [query, setQuery] = useState()
    const [hasFocus, setFocus] = useState(false)
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    useClickOutside(rootRef, () => setFocus(false))
    useEffect(() => handleComponentMounted());
    const handleComponentMounted = () => {

        //let {keyword} = queryString.parse(location);
        //console.log(location);

    }

    return (
        <ThemeProvider theme={theme}>
            <StyledSearchRoot ref={rootRef}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={indices[0].name}
                    onSearchStateChange={({ query }) => {
                        
                        navigate(window.location.pathname + `?keyword=${query}`)
                        console.log('search-query',query);
                        setQuery(query);
                    }}
                >
                    <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
                    <StyledSearchResult
                        show={query && query.length > 0 && hasFocus}
                        indices={indices}
                    />
                </InstantSearch>
            </StyledSearchRoot>
        </ThemeProvider>
    )
}