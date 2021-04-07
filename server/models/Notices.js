const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = schema.Types;

const noticesSchema = new schema({
    title: {
        type: String,
    },
    uploadDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    givenBy: {
        type: ObjectId,
        ref: "Teacher",
    },
});

const Notice = mongoose.model("Notice", noticesSchema);
module.exports = Notice;
