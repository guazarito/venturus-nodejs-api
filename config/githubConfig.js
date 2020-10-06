
const configGithub = {
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