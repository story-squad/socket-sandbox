/**
 * encode a string in Base64
 * @param str string
 */
const encode64 = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");

/**
 * decode a string from Base64
 * @param str string
 */
const decode64 = (str: string): string =>
  Buffer.from(str, "base64").toString("binary");

/**
 * Base64 string operatoins
 */
export const b64 = { encode: encode64, decode: decode64 };
