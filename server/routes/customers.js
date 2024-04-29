const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers");

router.route("/").post(addCustomer).get(getAllCustomers);
router
  .route("/:id")
  .get(getCustomer)
  .delete(deleteCustomer)
  .patch(updateCustomer);

module.exports = router;
