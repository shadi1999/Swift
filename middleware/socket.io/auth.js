const config = require('config');
const jwt = require('jsonwebtoken');

function socketAuth(socket, next) {
    let token = socket.handshake.query.token;

    // Check for token
    if (!token)
        socket.disconnect(true);

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        socket.user = decoded.user;
        next();
    } catch (e) {
        socket.disconnect(true);
    }
}

module.exports = auth;