import livelinks from "../models/livelink.js";
import { getCurrentDate } from "./scoreboard.js";
import admins from "../models/auth.js";

export const postLiveLink = async (req, res) => {
    try {

        const newLLdata = req.body;

        const admin = await admins.findOne({ username: newLLdata.admin.username })
        console.log("hello", admin)
        if (admin) {
            const currentTime = getCurrentDate()
            const livelinkData = await livelinks.create({
                title: newLLdata.title,
                link: newLLdata.link,
                postedBy: admin.username,
                timeOfPost: currentTime
            })
            await admin.livelinks.push(livelinkData._id)
            await admins.findByIdAndUpdate(admin._id, admin)

            res.status(200).json({ message: "Successfully uploaded live link" })
        } else {
            res.status(404).json({ message: "Admin not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: String(error) })
    }
}

export const getAllLiveLinks = async (req, res) => {
    try {

        const AllLivelinks = await livelinks.find()
        console.log("hi", AllLivelinks)
        if (!AllLivelinks) {
            res.status(404).json({ message: "No live links found" })
        }
        res.status(200).json({ result: AllLivelinks })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: String(error) })
    }
}