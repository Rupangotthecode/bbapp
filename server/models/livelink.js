import mongoose from "mongoose";

const LiveLinkSchema = mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    postedBy: { type: String, requred: true },
    timeOfPost: { type: String, required: true }
})

export default mongoose.model("LiveLink", LiveLinkSchema);