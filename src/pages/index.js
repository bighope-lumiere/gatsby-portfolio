import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Title = styled.h1`
  font-size: 64px;
  color: rgba(0,0,0,.87);
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Title>Taiki Sato</Title>
    {data.allWorksYaml.edges.map(edge => {
      const work = edge.node
      return (
        <div>
          <Link to={`/works/${work.slug}`}>
            {work.title} - {work.category} - {work.year}
          </Link>
        </div>
      )
    })}
    <Link to="/about">Go to about page</Link>
  </Layout>
)

// query という名前で export すると GraphQL が実行され、コンポーネントの props.data として結果が渡される。
export const query = graphql`
    query {
      allWorksYaml {
        edges {
          node {
            title
            category
            year
            slug
          }
        }
      }
    }
`

export default IndexPage
