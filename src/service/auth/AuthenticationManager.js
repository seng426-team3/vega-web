import { doPost } from "../BaseAPI.js";

export function login(userInfo) {
  console.log("In Auth - Login", userInfo);
  return doPost(process.env.REACT_APP_API_URL + "/api/login", userInfo);
}

export function signUp(userInfo) {
  console.log("In Auth - Signup", userInfo);
  return doPost(process.env.REACT_APP_API_URL + "/api/signup", userInfo);
}
