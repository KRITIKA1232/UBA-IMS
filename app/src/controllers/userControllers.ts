import { Request, Response } from 'express';
import { getUsers, saveUsers } from '../helpers/helper';

class UserController {
    public static createUser(req: Request, res: Response): void {
        const { fname, lname } = req.body;
        const users = getUsers();

        // Check for duplicates
        if (users.some(user => user.fname.toLowerCase() === fname.toLowerCase() && user.lname.toLowerCase() === lname.toLowerCase())) {
            res.status(400).json({ message: `User ${fname} ${lname} already exists.` });
            return;
        }

        users.push({ fname, lname });
        saveUsers(users);
        res.status(201).json({ message: `User ${fname} ${lname} created.` });
    }

    public static getUserByFirstName(req: Request, res: Response): void {
        const { fname } = req.params;
        const users = getUsers();

        const user = users.find(user => user.fname.toLowerCase() === fname.toLowerCase());

        if (!user) {
            res.status(404).json({ message: `User ${fname} not found.` });
            return;
        }

        res.status(200).json(user);
    }

    public static getAllUsers(req: Request, res: Response): void {
        const users = getUsers();
        res.status(200).json(users);
    }

    public static deleteUser(req: Request, res: Response): void {
        const { fname } = req.params;
        const users = getUsers();

        const userExists = users.some(user => user.fname.toLowerCase() === fname.toLowerCase());
        if (!userExists) {
            res.status(404).json({ message: `No user found with first name ${fname}.` });
            return;
        }

        // Proceed with deletion
        const filteredUsers = users.filter(user => user.fname.toLowerCase() !== fname.toLowerCase());
        saveUsers(filteredUsers);

        res.status(200).json({ message: `User(s) with first name ${fname} deleted.` });
    }

    public static updateUser(req: Request, res: Response): void {
        const { fullname, newfname, newlname } = req.body;
        const users = getUsers();

        const trimmedFullname = fullname.trim();
        const trimmedNewFname = newfname.trim();
        const trimmedNewLname = newlname.trim();

        // Find user (case-insensitive)
        const user = users.find(
            (user) => `${user.fname.toLowerCase()} ${user.lname.toLowerCase()}` === trimmedFullname.toLowerCase()
        );

        if (!user) {
            res.status(404).json({ message: `No user found with name ${trimmedFullname}` });
            return;
        }

        // Update user details
        user.fname = trimmedNewFname;
        user.lname = trimmedNewLname;
        saveUsers(users);

        res.status(200).json({ message: `Updated: ${trimmedFullname} -> ${trimmedNewFname} ${trimmedNewLname}` });
    }
}

export default UserController;
