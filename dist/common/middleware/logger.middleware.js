"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = require("../../utils/log4js");
function logger(req, res, next) {
    const code = res.statusCode;
    next();
    const logFormat = ` Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Status code: ${code}
  Parmas: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)}  
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
    if (code >= 500) {
        log4js_1.Logger.error(logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(logFormat);
    }
    else {
        log4js_1.Logger.access(logFormat);
        log4js_1.Logger.log(logFormat);
    }
}
exports.logger = logger;
//# sourceMappingURL=logger.middleware.js.map