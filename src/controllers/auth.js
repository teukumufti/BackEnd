const joi = require("joi");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().min(5).required(),
    password: joi.string().min(6).required(),
    status: joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(401).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: req.body.status,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

    res.status(201).send({
      status: "Success",
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to add data",
    });
  }
};

// login
exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().min(5).required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(401).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExists = await User.findOne({
      where: { email: req.body.email },
      attributes: {
        exclude: ["createdAt", "updatedAt", "id"],
      },
    });
    if (!userExists) {
      return res.status(400).send({
        status: "Not found",
        message: "Email salah",
      });
    }

    const isValid = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!isValid) {
      return res.status(400).send({
        status: "Not found",
        message: "Password salah",
      });
    }

    const token = jwt.sign({ id: userExists.id }, process.env.SECRET_KEY);

    res.status(200).send({
      status: "Success",
      data: {
        user: {
          name: userExists.name,
          email: userExists.email,
          status: userExists.status,
          token,
        },
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
