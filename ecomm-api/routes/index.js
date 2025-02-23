var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json("welcome to Footwear Ecommerce Application API");
});

module.exports = router;
