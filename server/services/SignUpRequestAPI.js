import { doPost } from "./HTTPRequestAPI.js";

export function signUp(url, data) {
  return doPost(url, data);
}
