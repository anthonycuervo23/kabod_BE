module.exports = mongoose => {
    const Result = mongoose.model(
      "Result",
      mongoose.Schema(
        {
            weight: String,
            reps: String,
            time: String,
            score_type: String,
            createdAt: {
              type: Date,
              default: Date.now
            }
        }
      )
    );
  
    return Result;
  };