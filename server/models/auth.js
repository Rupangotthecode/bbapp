import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    schedules: [
        {
            title: { type: String, required: true },
            itemTitle: { type: String, required: true },
            duration: { type: String, required: true },
            dateOfCreation: { type: String, required: true },
            itemTitle: { type: String, required: true },
            itemTournament: { type: String },
            poolNo: { type: String },
            matchNo: { type: String },
        }
    ],
    scoreboards: [
        { type: String, required: true }
    ]
});

export default mongoose.model("Admin", adminSchema);