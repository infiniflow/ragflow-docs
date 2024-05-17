const fragmentPlugin = require('../../plugins/remark-plugins/fragments');
const variablePlugin = require('../../plugins/remark-plugins/variables');
const variables = require('../..//variables');
const docutils = require('../flaturl/doc');

const myArgs = process.argv.slice(2);
let baseurl = './.flatdocs'
if (myArgs.length >= 1) {
  baseurl = myArgs[0]
}

const mdxLoader = require('@docusaurus/mdx-loader').default;
const {
  reportMessage,
} = require('@docusaurus/utils')

const loadContext = (errors) => {
  return {
    async: () => {
      return () => {}
    },
    getOptions: () => ({
      remarkPlugins: [
        [variablePlugin, { data: variables, fail: false, onError: (err, line) => {errors.push([err, line])} }],
        [fragmentPlugin, { prefix: 'fragments', fail: false, baseUrl: process.cwd() + '/fragments', onError: (err, line) => {errors.push([err, line])} }]
      ],
    })
  }
}

async function validateFragmentsAndVariables(contentPath) {
  const docs = await docutils.getDocMetadata(contentPath);
  let haserrors = false
  for (const doc of docs) {
    const errors = []
    const context = loadContext(errors)
    const mdxLoaderWithContext = mdxLoader.bind(context)
    await mdxLoaderWithContext(doc.body)
    if (errors.length > 0) {
      haserrors = true
      reportMessage(`- on source page path = ${doc.source}`, 'error')
      for (const item of errors) {
        reportMessage(`   line:${item[1].line} Column:${item[1].column} ${item[0]}`, 'error')
      }
    }
  }
  if (haserrors) {
    process.exit(1)
  }
}

validateFragmentsAndVariables(baseurl)
