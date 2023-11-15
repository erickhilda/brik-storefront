import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import createError from "http-errors";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

/**
 *
 * @param payload - The payload to sign
 * @returns A promise that resolves to a signed token
 * @example
 * const token = await signAccessToken({ id: 1, name: "John Doe" });
 */
export function signAccessToken<T>(payload: Object): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token as unknown as T);
    });
  });
}

/**
 *
 * @param token - The token to verify
 * @returns A promise that resolves to the payload of the token
 * @example
 * const payload = await verifyAccessToken(token);
 */
export function verifyAccessToken<T>(token: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(createError.Unauthorized(message));
      }
      resolve(payload as unknown as T);
    });
  });
}
