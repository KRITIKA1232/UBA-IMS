import { Request, Response } from "express";
import { getUsers, saveUser, getUserByFirstName, deleteUser, updateUser } from "../helpers/helper";

class UserController {
    public static async createUser(req: Request, res: Response) {
        try {
            const { fname, lname } = req.body;

            // Check for duplicate users in MySQL
            const existingUser = await getUserByFirstName(fname);
            if (existingUser) {
                return res.status(400).json({ message: `User ${fname} ${lname} already exists.` });
            }

            const newUser = await saveUser(fname, lname); // ✅ Save to database
            return res.status(201).json({ message: `User ${fname} ${lname} created.`, user: newUser });
        } catch (error) {
            console.error("❌ Error creating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getUserByFirstName(req: Request, res: Response) {
        try {
            const { fname } = req.params;
            const user = await getUserByFirstName(fname);

            if (!user) {
                return res.status(404).json({ message: `User ${fname} not found.` });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error("❌ Error fetching user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await getUsers(); // ✅ Fetch all users from MySQL
            return res.status(200).json(users);
        } catch (error) {
            console.error("❌ Error fetching users:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async deleteUser(req: Request, res: Response) {
        try {
            const { fname } = req.params;
            const success = await deleteUser(fname);

            if (!success) {
                return res.status(404).json({ message: `No user found with first name ${fname}.` });
            }

            return res.status(200).json({ message: `User ${fname} deleted.` });
        } catch (error) {
            console.error("❌ Error deleting user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async updateUser(req: Request, res: Response) {
        try {
            const { fullname, newfname, newlname } = req.body;
            const updatedUser = await updateUser(fullname, newfname, newlname);

            if (!updatedUser) {
                return res.status(404).json({ message: `No user found with name ${fullname}.` });
            }

            return res.status(200).json({ message: `Updated: ${fullname} -> ${newfname} ${newlname}`, user: updatedUser });
        } catch (error) {
            console.error("❌ Error updating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default UserController;
