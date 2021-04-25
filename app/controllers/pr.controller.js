const db = require("../models");
const Exercise = db.exercises;
const Result = db.results;

// Create and Save a new Exercise
exports.create = (req, res) => {
        // Validate request
        if (!req.body.exercise) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }
      
        // Create a Exercise
        const exercise = new Exercise({
          exercise: req.body.exercise,
        });
      
        // Save Exercise in the database
        exercise
          .save(exercise)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Exercise."
            });
          });
};

// Retrieve all Exercises from the database.
exports.findAll = (req, res) => {
    const exercise = req.query.exercise;
    var condition = exercise ? { exercise: { $regex: new RegExp(exercise), $options: "i" } } : {};
  
    Exercise.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving exercises."
        });
      });
  };

// Find a single Exercise with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Exercise.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Exercise with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Exercise with id=" + id });
      });
  };

// Update a Exercise by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Exercise.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Exercise with id=${id}. Maybe Exercise was not found!`
          });
        } else res.send({ message: "Exercise was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Exercise with id=" + id
        });
      });
  };

// Delete a Exercise with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Exercise.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Exercise with id=${id}. Maybe Exercise was not found!`
          });
        } else {
          res.send({
            message: "Exercise was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Exercise with id=" + id
        });
      });
  };

  //Create new Result and update Exercise
exports.updateExercisewithResult = async (req, res) => {
   
                // Create a Result
                const exerciseId = req.params.id;

                const result = new Result({
                    weight: req.body.weight,
                    reps: req.body.reps,
                    time: req.body.time,
                    createdAt: req.body.createdAt
                  });
                
                  // Save Exercise in the database
                  result
                    .save(result)
                    .then(data => {
                      res.send(data);
                    })
                    .catch(err => {
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Result."
                      });
                    });

        

        const newExercise = await Exercise.findByIdAndUpdate(
            exerciseId, 
            {
                $push: { results: result._id }
            },
            { new: true, useFindAndModify: false },
        );
    };


exports.deleteResult = (req, res) => {
   const id = req.params.id;
  Result.findByIdAndRemove(id, function(err, result){
      if(!err) {
        Exercise.updateMany({"results": id}, {$pull: {"results": id}}, function(err, numberAffected){
        res.send({message: "Result was deleted successfully!"});
        console.log(numberAffected);
        })
      } else if(!result) {
                 res.status(404).send({
           message: `Cannot delete Result with id=${id}. Maybe Result was not found!`
         });
        console.log(err);
      }
  })    .catch(err => {
    res.status(500).send({
      message: "Could not delete Result with id=" + id
    });
  });
}

// Retrieve all Results that belong to a specific Exercise
exports.findAllResults = (req, res) => {

  const id = req.params.id;

  Exercise.find({"_id": id}).populate("results")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving results."
      });
    });
};

// Update a Result by the id in a specific Exercise
exports.updateResult = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Result.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Result with id=${id}. Maybe Result was not found!`
        });
      } else res.send({ message: "Result was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Result with id=" + id
      });
    });
};