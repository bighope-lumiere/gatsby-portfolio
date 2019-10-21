// Node.js の標準モジュールなのでインストール不要
// 単なる Node.js なので、モジュールを呼び出すときは require を使います。
// src/ 以下では内部的に webpack を使っているので import で呼び出します。
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWorksYaml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allWorksYaml.edges.map(edge => {
      const work = edge.node
      // デバッグ用にログを出力しておくと便利
      console.log("Create Page", `/works/${work.slug}`)
      createPage({
        // work の slug を元にパスを組み立てて文字列で渡す
        path: `/works/${work.slug}`,
        // path.resolve を使うと絶対パスに変換してくれる
        component: path.resolve("./src/templates/work.js"),
        // コンポーネントにわたすデータを指定している
        // ココに与えた値が GraphQL の変数としてセットされる
        context: {
          slug: work.slug
        },
      })
    })
  })
}