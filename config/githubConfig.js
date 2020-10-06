
const configGithub = {
    token: 'bbfe574775e0746f095dace8dd3a7db47d79858a',
    httpOptions: {
        host: 'api.github.com',
        method: 'GET',
        headers: {
          'user-agent': 'node.js',
          'Content-Type': 'application/json',
          'Accept': [
              'application/vnd.github.v3.full+json',
              'application/vnd.github.machine-man-preview',
              'application/vnd.github.mercy-preview+json'
          ]
        }
      }
}


module.exports = configGithub;