module.exports = mongoose => {
    const Result = mongoose.model(
      "Result",
      mongoose.Schema(
        {
            weight: Number,
            reps: Number,
            time: String,
            comment: String,
            createdAt: {
              type: Date,
              default: Date.now
            }
        }
      )
    );
  
    return Result;
  };