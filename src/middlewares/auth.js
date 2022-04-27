const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("token: ", token);

  if (!token) {
    return res.status(401).send({
      message: "Undifined token",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Invalid token",
    });
  }
};
