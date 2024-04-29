const { StatusCodes } = require("http-status-codes");
const Customer = require("../models/customers");
const { NotFoundError, CustomApiError, BadRequestError } = require("../errors");
const addCustomer = async (req, res) => {
  const { email } = req.body;
  req.body.createdBy = req.user.id;
  const isCustomerPresent = await Customer.findOne({
    createdBy: req.user.id,
    email: email,
  });
  if (isCustomerPresent) {
    throw new BadRequestError("Customer is already present");
  }

  console.log(req.body);
  const customer = await Customer.create(req.body);
  res.status(StatusCodes.CREATED).send(customer);
};

const getAllCustomers = async (req, res) => {
  const customer = await Customer.find({ createdBy: req.user.id });
  res.status(StatusCodes.OK).send({ customer });
};

const getCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOne({ createdBy: req.user.id, _id: id });

  if (!customer) {
    throw new NotFoundError("Object against this ID is not Found");
  }

  res.status(StatusCodes.OK).send({ customer });
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOneAndDelete({
    createdBy: req.user.id,
    _id: id,
  });

  if (!customer) {
    throw new NotFoundError("Object against this ID is not Found");
  }

  res.status(StatusCodes.OK).send({ customer });
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findOneAndUpdate(
    {
      createdBy: req.user.id,
      _id: id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    throw new NotFoundError("Object against this ID is not Found");
  }

  res.status(StatusCodes.OK).send(customer);
};

module.exports = {
  getAllCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
};
