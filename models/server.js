const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users'
    
    // Middlewares
    this.midlewares();

    // Rutas
    this.routes();
  }

  midlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use( express.json() );

    if(process.argv[2] === "--dev") {
        // Morgan
      this.app.use(morgan("dev"));
    }
    
    // Directorio publico
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listenig on port ${this.port}`)
    });
  }
}

module.exports = Server;