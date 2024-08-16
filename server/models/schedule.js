import mongoose from "mongoose";

const ScheduleSchema = mongoose.Schema({
    title: { type: String, required: true },
    itemTime: { type: String, required: true },
    duration: { type: String },
    dateOfCreation: { type: String, required: true },
    itemTitle: { type: String, required: true },
    itemTournament: { type: String },
    poolNo: { type: String },
    matchNo: { type: String },
    username: { type: String, required: true },
    userId: { type: String, required: true }
})

export default mongoose.model("Schedule", ScheduleSchema);