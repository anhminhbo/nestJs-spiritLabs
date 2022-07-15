"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearerTokenExtractor = exports.cookieTokenExtractor = void 0;
function cookieTokenExtractor(req) {
    if (req && req.cookies && req.cookies['refreshToken'])
        return req.cookies['refreshToken'];
    return null;
}
exports.cookieTokenExtractor = cookieTokenExtractor;
function bearerTokenExtractor(req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1];
    return null;
}
exports.bearerTokenExtractor = bearerTokenExtractor;
//# sourceMappingURL=token-extractor.js.map