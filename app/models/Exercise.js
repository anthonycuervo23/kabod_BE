module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      uid: String,
      exercise: String,
      results: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Result"
        }
      ],
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Exercise = mongoose.model("exercise", schema);
  return Exercise;
};