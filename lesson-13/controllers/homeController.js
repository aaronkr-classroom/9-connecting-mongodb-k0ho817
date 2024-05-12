
// homeController.js
"use strict";

/**
 * Listing 10.2
 */
exports.respondWithName = (req, res) => {
  res.render("index");
};

/**
 * Listing 10.3
 */
exports.respondWithName2 = (req, res) => {
  let paramsName = req.params.myName;
  res.render("index", { name: paramsName });
};

exports.getHomePage = (req, res) => {
  res.render("index", {
    name: null,
  });
};
