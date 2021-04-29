module.exports = app => {
  const exercises = require("../controllers/pr.controller.js");
  const auth = require("../controllers/auth.controller.js");
  var router = require("express").Router();

  // Create a new Exercise
  router.post("/", exercises.create);

  // Retrieve all Exercises
  router.get("/", exercises.findAll);

  // Retrieve a single Exercise with id
  router.get("/:id", exercises.findOne);

  // Update a Exercise with id
  router.put("/:id", exercises.update);

  // Delete a Exercise with id
  router.delete("/:id", exercises.delete);

  // Create new Result in specific Exercise
  router.post("/:id/results", exercises.updateExercisewithResult);

  //Delete a Result with id
  router.delete("/results/:id", exercises.deleteResult);

  //Update a Result with id
  router.put("/results/:id", exercises.updateResult);

  app.use('/api/v1/exercises', auth.checkIfAuthenticated, router);
};

