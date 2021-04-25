module.exports = mongoose => {
    const Exercise = mongoose.model(
      "exercise",
      mongoose.Schema(
        {
          exercise: String,
          results: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Result"
            }
          ],
        }
      )
    );
  
    return Exercise;
  };