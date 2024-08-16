import admins from "../models/auth.js";
import schedules from "../models/schedule.js"

const getCurrentDate = () => {
    const now = new Date();

    // Extract date components
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    // Extract time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Combine date and time
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const addSchedule = async (req, res) => {
    try {
        const { title, itemTime, duration, itemTitle, itemTournament, poolNo, matchNo, user } = req.body;
        console.log(title, duration, itemTitle, itemTournament, poolNo, matchNo, user)
        let admin = await admins.findOne({ "username": user.username });
        if (admin) {
            const currentDate = getCurrentDate()
            const newSchedule = await schedules.create({
                title: title,
                itemTime: itemTime,
                duration: duration,
                itemTitle: itemTitle,
                itemTournament: itemTournament,
                poolNo: poolNo,
                matchNo: matchNo,
                username: user.username,
                dateOfCreation: currentDate,
                userId: user._id
            })
            admin.schedules.push({
                title: title,
                itemTime: itemTime,
                duration: duration,
                itemTitle: itemTitle,
                itemTournament: itemTournament,
                poolNo: poolNo,
                matchNo: matchNo,
            })
            await admins.findByIdAndUpdate(user._id, admin)
            res.status(200).json({ result: newSchedule })
        } else {
            console.log("No admin found with the given username.");
            res.status(400).message("Unable to find account user")
        }
    }
    catch (error) {
        console.log("Error adding schedule")
        res.status(500).json({ message: `Error adding schedule ${String(error)}` })
    }
}

export const getAllSchedules = async (req, res) => {
    try {
        const allSchedules = await schedules.find()
        res.status(200).json({ result: allSchedules })
    } catch (error) {
        console.log("Error fetching all schedules")
        res.status(400).json({ message: `Error fetching all schedules ${error}` })
    }
}