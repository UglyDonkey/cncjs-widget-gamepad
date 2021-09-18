const io = require('socket.io-client');

module.exports = function(options, callback) {

  const {host, token} = options;

  const url = `ws://${host}?token=${token}`;

  let socket = io.connect(`ws://${host}`, {
    'query': 'token=' + token
  });

  socket.on('connect', () => {
    console.log('Connected to ' + url);
    callback(null, socket);

    // Open port
    // socket.emit('open', options.port, {
    //   baudrate: Number(options.baudrate),
    //   controllerType: options.controllerType
    // });
  });

  socket.on('error', (err) => {
    console.error('Connection error.');
    if (socket) {
      socket.destroy();
      socket = null;
    }
  });

  socket.on('close', () => {
    console.log('Connection closed.');
  });

  // socket.on('serialport:open', function(options) {
  //   options = options || {};

  //   console.log('Connected to port "' + options.port + '" (Baud rate: ' + options.baudrate + ')');

  //   callback(null, socket);
  // });

  socket.on('serialport:error', function(options) {
    callback(new Error('Error opening serial port "' + options.port + '"'));
  });

  socket.on('serialport:read', function(data) {
    // console.log((data || '').trim());
  });

  /*
  socket.on('serialport:write', function(data) {
      console.log((data || '').trim());
  });
  */
};
