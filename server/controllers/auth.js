import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import admins from "../models/auth.js";
import dotenv from "dotenv"

dotenv.config()

const ORI_ADMIN_CODE = process.env.ADMIN_CODE

export const signup = async (req, res) => {
    const { username, name, password, adminCode } = req.body
    console.log(username, name, password, adminCode)
    try {
        if (adminCode === ORI_ADMIN_CODE) {
            const existingAdmin = await admins.findOne({ username });
            if (existingAdmin) {
                return res.status(404).json({ message: "Username already exists." });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newAdmin = await admins.create({
                name: name,
                password: hashedPassword,
                username: username,
            });
            const token = jwt.sign(
                { name: newAdmin.name, id: newAdmin.username },
                process.env.JWT_SECRET,
                { expiresIn: "6h" }
            );
            res.status(200).json({ result: newAdmin, token });
        }
        else {
            return res.status(401).json({ message: "Invalid admin code" })
        }

    } catch (error) {
        res.status(500).json(`Something went wrong... \n ${error}`);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingAdmin = await admins.findOne({ username });
        if (!existingAdmin) {
            return res.status(404).json({ message: "Admin doesn't Exist." });
        } else {
            const isPasswordCrt = await bcrypt.compare(
                password,
                existingAdmin.password
            );
            if (!isPasswordCrt) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign(
                { name: existingAdmin.name, id: existingAdmin.username },
                process.env.JWT_SECRET,
                { expiresIn: "6h" }
            );
            res.status(200).json({ result: existingAdmin, token });
        }
    } catch (error) {
        res.status(500).json(`Something went wrong... \n ${error}`);
    }
};