import jwt, { JwtPayload } from "jsonwebtoken";
import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";
import { parserCookies } from "./cookies";

interface IKeyCloakConfig {
  realm: string;
  url: string;
  clientId: string;
}

export const KEYCLOAK_PUBLIC_CONFIG: IKeyCloakConfig = {
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
};

export type Payload = KeycloakTokenParsed &
  KeycloakProfile & { subdomain: string };

export type Token = { token: string; payload: Payload };

type Request = { headers: { cookie?: any } };

export function validateAuth(req?: Request): Token | boolean {
  const cookie = parserCookies(req);
  if (!cookie.kcToken) {
    return false;
  }

  const token = Buffer.from(cookie.kcToken, "base64").toString("utf-8");
  const payloadOrFalse = verifyToken(token, process.env.JWT_SECRET as string);
  return payloadOrFalse
    ? ({ token, payload: payloadOrFalse } as any)
    : payloadOrFalse;
}

export function verifyToken(token: string, key: string): JwtPayload | false {
  try {
    return jwt.verify(token, key, { ignoreExpiration: false }) as JwtPayload;
  } catch (e) {
    console.error(e, token, key);
    return false;
  }
}
