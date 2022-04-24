const models = require("../../models");

// add user
exports.addUser = async (req, res) => {
  try {
    await models.User.creates(req.body);

    res.status(201).send({
      status: "Success",
      message: "Add successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to add data",
    });
  }
};

// get all user
exports.getUsers = async (req, res) => {
  try {
    const data = await models.User.findAll();

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

    const data = await models.User.findAll({ where: { id } });

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

    const data = await models.User.update(req.body, {
      where: { id },
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

    await models.User.destroy({
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
