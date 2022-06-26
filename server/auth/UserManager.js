import { signUp } from "../services/SignUpRequestAPI.js";

function userModule(req, res) {
  if (req.method == "POST") {
    const userInfo = req.body;
    console.log(userInfo);
    signUp(process.env.API_URL + "/venus/register", userInfo)
      .then((response) => {
        console.log("Response", response);
        res.send(response);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.send(error);
      });
  }
}

export default userModule;
