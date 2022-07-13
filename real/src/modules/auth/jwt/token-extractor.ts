import { Request } from 'express';

export default function cookieOrBearerTokenExtractor(req: Request) {
  if (req && req.cookies && req.cookies['accessToken'])
    return req.cookies['accessToken'];
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  )
    return req.headers.authorization.split(' ')[1];
  return null;
}
