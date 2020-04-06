const fs = require('fs');
module.exports = {
  key: fs.readFileSync('/etc/letsencrypt/live/sprint-app.com/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/sprint-app.com/cert.pem', 'utf8')
};