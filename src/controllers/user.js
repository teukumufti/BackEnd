const { User } = require("../../models");

// get all user
exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "Success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to get user",
    });
  }
};

// get user by id
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findAll({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "id"],
      },
    });

    res.send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to get id",
    });
  }
};

// update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.update(req.body, {
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "id"],
      },
    });

    res.send({
      status: "Success",
      message: `Update user id : ${id} success`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to update user",
    });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    res.send({
      status: "Success",
      message: `Delete user id : ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to delete user",
    });
  }
};
