var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    LOCAL_URL: '"http://localhost"',
  DISQUS_URL: '"http://localhost:8080/posts/"',
  DISQUS_NAME: '"alex-party-dev"',
})
