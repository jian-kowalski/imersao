import cookie from "cookie";

export function parserCookies(req?: any) {
  if (!req || !req.headers) {
    return {};
  }

  return cookie.parse(req.headers.cookie || "");
}
