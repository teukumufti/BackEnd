const models = require("../../models");

// get all user
exports.login = async (req, res) => {
  try {
    const data = await models.User.findOne({
      where: { email: req.body.email, password: req.body.password },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "id"],
      },
    });
    if (data === null) {
      res.status(404).send({
        status: "Not found",
        message: "email atau password salah",
      });
    } else {
      res.status(200).send({
        status: "Success",
        data: {
          user: data,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to get user",
    });
  }
};
