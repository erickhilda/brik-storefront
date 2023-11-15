import jwt from "jsonwebtoken";
import createError from "http-errors";
import { ACCESS_TOKEN_SECRET } from "./env";

/**
 *
 * @param payload - The payload to sign
 * @returns A promise that resolves to a signed token
 * @example
 * const token = await signAccessToken({ id: 1, name: "John Doe" });
 */
export function signAccessToken<T>(payload: Object): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, ACCESS_TOKEN_SECRET, {}, (err, token) => {
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
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(createError.Unauthorized(message));
      }
      resolve(payload as unknown as T);
    });
  });
}
