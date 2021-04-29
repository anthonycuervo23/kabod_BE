module.exports = mongoose => {
  var schema = mongoose.Schema(
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
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Result = mongoose.model("Result", schema);
  return Result;
};