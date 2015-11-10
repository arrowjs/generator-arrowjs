'use strict';
const Arrow = require('arrowjs');

const application = new Arrow();
// Default port is 8000. It is defined in config/config.js port field
// You may change port in config/config.js or by assign new port like below code
// application._config.port = 9000;
application.start();
