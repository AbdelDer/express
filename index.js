const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `.env.local`});

console.log(process.env.PORT);

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
