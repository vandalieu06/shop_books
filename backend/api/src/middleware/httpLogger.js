const pinoHttp = require("pino-http");
const logger = require("../config/logger");

const httpLogger = pinoHttp({
  logger,
  genReqId: function (req) {
    return req.requestId;
  },
  customProps: function (req, res) {
    return {
      requestId: req.requestId,
      userId: req.user?.userId || req.user?.id || null,
    };
  },
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});

module.exports = httpLogger;
