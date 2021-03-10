
import Link from 'gatsby-link'
import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { navigate, withPrefix } from "gatsby"
import { globalHistory } from "@reach/router"


const Header = (props) => {

    let [lang, setlang,] = useState()
    let [translation, settranslation] = useState()

    useEffect(() => handleComponentMounted(), []);

    const handleComponentMounted = () => {
        console.log(props)
        //console.log('Header', props.lang);
        if (props.lang == "en_US" || props.lang == "en") {
            setlang("en")
        }
        else {
            setlang("ar")
        }

        if (props.translations && props.translations == "generic") {
            let path = globalHistory.location.pathname.split('/')
            var langpath = path[1];
            //console.log('langpath', path);
            var newlangpath = langpath == "en" ? "ar" : "en";
            path[1] = newlangpath;
            settranslation(path.join("/"));
        }

        else if (props.translations.length > 0) {
            let trans = props.translations[0];
            if (props.lang == "en_US" || props.lang == "en") {
                let langUrl = trans.localizedWpmlUrl;
                settranslation(langUrl);
            }
            else {
                let langUrl = "/en" + trans.localizedWpmlUrl;
                settranslation(langUrl);
            }
        }
    }

    const clickHandler = () => {

    }

    const _closeBtn = () => {

    }
    const data = useStaticQuery(graphql`
    {
      allWpMenu(filter: {name: {eq: "Primary"}}) {
          edges {
            node {
              id
              menuItems {
                nodes {
                  url
                  label
                  childItems {
                    nodes {
                      url
                      label
                    }
                  }
                }
              }
            }
          }
        }
    }
  `)



    //     console.log(data)

    //     useEffect(() => handleComponentMounted(), []);
    //     const handleComponentMounted = () => {


    //     }
    return (
        <ul class="menubx">

            {data.allWpMenu.edges[0].node.menuItems.nodes.map(item => (
                item.wordpress_children ?
                    <li onClick={clickHandler} className="has-submenu">
                        <Link to={`/${lang}${item.url}`} key={item.label} title={item.label}>{item.label}</Link>
                        <ul class="sub-menu">
                            {item.wordpress_children.map(chld => (
                                <li onClick={clickHandler}>
                                    <Link to={`${chld.url}`} key={chld.label} title={chld.label}>
                                        {chld.label}
                                    </Link>
                                </li>

                            ))}
                        </ul>
                    </li> :
                    <li onClick={clickHandler} >
                        <Link to={`/${lang}${item.url}`} key={item.label} title={item.label}>
                            {item.label}
                        </Link>
                    </li>

            ))}
            {translation ?
                <li onClick={clickHandler} >
                    <Link to={translation} key="lang" title="lang">
                        {lang == "en" ? "AR" : "EN"}
                    </Link>
                </li>
                : null}
        </ul>
    )
}


export default Header


