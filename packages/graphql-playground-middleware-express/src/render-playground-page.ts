import * as path from 'path'
import * as fs from 'fs'
import * as findUp from 'find-up'

export interface MiddlewareOptions {
  version: string
  endpoint: string
  subscriptionEndpoint?: string
  setTitle?: string
  folderName?: string
}

const configPath = findUp.sync(['.graphqlconfig', '.graphqlconfig.yml'])
const configString = configPath
  ? fs.readFileSync(configPath, 'utf-8')
  : undefined
const folderName = configPath
  ? path.basename(path.dirname(configPath))
  : undefined

export default function renderPlaygroundPage(options: MiddlewareOptions) {
  const extendedOptions = {
    ...options,
    configString,
    folderName,
    canSaveConfig: false,
  }
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
  <title>GraphQL Playground</title>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/graphql-playground@${
    options.version
  }/build/static/css/index.css" />
  <link rel="shortcut icon" href="//cdn.jsdelivr.net/npm/graphql-playground@${
    options.version
  }/build/favicon.png" />
  <script src="//cdn.jsdelivr.net/npm/graphql-playground@${
    options.version
  }/build/static/js/middleware.js"></script>
</head>
<body>
<div id="root">
    <style>
        body {
            background-color: rgb(23,42,58);
            font-family: Open Sans,sans-serif;
            height: 90vh;
        }
        #root {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .loading {
            font-size: 32px;
            font-weight: 200;
            color: rgba(255,255,255,.6);
            margin-left: 20px;
        }
        img {
            width: 78px;
            height: 78px;
        }
        .title {
            font-weight: 400;
        }
    </style>
    <img src='//cdn.jsdelivr.net/npm/graphql-playground/build/logo.png' alt=''>
    <div class="loading">
        Loading <span class="title">GraphQL Playground</span>
    </div>
</div>
  <script>
    window.addEventListener('load', function(event) {
      GraphQLPlayground.init(document.getElementById('root'), ${JSON.stringify(
        extendedOptions,
        null,
        2,
      )})
    })
  </script>
</body>
</html>
`
}
