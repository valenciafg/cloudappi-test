'use strict'

var rawBodyMiddleware = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

module.exports = rawBodyMiddleware;
