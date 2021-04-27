//import {checkIfAuthenticated} from "../controllers/auth.controller";

module.exports = app => {
    const exercises = require("../controllers/pr.controller.js");
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();
  
    // Create a new Exercise
    router.post("/create" ,exercises.create);
  
    // Retrieve all Exercises
    router.get("/", exercises.findAll);
  
    // Retrieve a single Exercise with id
    router.get("/:id", exercises.findOne);
  
    // Update a Exercise with id
    router.put("/:id", exercises.update);
  
    // Delete a Exercise with id
    router.delete("/:id", exercises.delete);

    // Create new Result in specific Exercise
    router.post("/:id/results/create", exercises.updateExercisewithResult);

    //Retrieve all Results that belong to a Exercise id
    router.get("/:id/results/", exercises.findAllResults);

    //Delete a Result with id
    router.delete("/results/:id", exercises.deleteResult);

    //Update a Result with id
    router.put("/results/:id", exercises.updateResult);

    app.use('/exercises', auth.checkIfAuthenticated, router);
  };