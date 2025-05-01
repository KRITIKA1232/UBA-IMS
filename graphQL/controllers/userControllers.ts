// import { Request, Response } from 'express';
// import { getUsers, saveUsers } from '../helpers/helper';

// export const createUser = (req: Request, res: Response) => {
//   const { fname, lname } = req.body;
//   const users = getUsers();
//   users.push({ fname, lname });
//   saveUsers(users);
//   res.status(201).json({ message: `User ${fname} ${lname} created.` });
// };

// export const getAllUsers = (_req: Request, res: Response) => {
//   const users = getUsers();
//   res.status(200).json(users);
// };

// export const deleteUser = (req: Request, res: Response) => {
//   const { fname } = req.params;
//   const users = getUsers().filter((user) => user.fname !== fname);
//   saveUsers(users);
//   res.status(200).json({ message: `User(s) with first name ${fname} deleted.` });
// };

// export const updateUser = (req: Request, res: Response) => {
//   const { fullname, newfname, newlname } = req.body;
//   const users = getUsers();
//   const user = users.find(
//     (user) => `${user.fname} ${user.lname}` === fullname
//   );

//   if (user) {
//     user.fname = newfname.trim();
//     user.lname = newlname.trim();
//     saveUsers(users);
//     res.status(200).json({ message: `Updated: ${fullname} -> ${newfname} ${newlname}` });
//   } else {
//     res.status(404).json({ message: `No user found with name ${fullname}` });
//   }
// };


import User from '../models/user';
import { GraphQLError } from 'graphql';

const userControllers = {
    getAllUsers: async () => {
        const users = await User.findAll();
        return users.map(user => user.toJSON()); // Convert Model instances to plain objects
    },
    getUser: async (fname: string) => {
        const user = await User.findOne({ where: { fname } });
        if (!user) throw new GraphQLError(` User '${fname}' not found.`);
        return user.toJSON(); // Convert Model instance to plain object;
    },

    createUser: async (fname: string, lname: string) => {
        const existingUser = await User.findOne({ where: { fname, lname } });
        if (existingUser) throw new GraphQLError(` User '${fname} ${lname}' already exists.`);

        const newUser = await User.create({ fname, lname });
        return newUser.toJSON(); //  Convert Model instance to plain object
    },

    deleteUser: async (fname: string) => {
        const deletedUser = await User.findOne({ where: { fname } });
        if (!deletedUser) return { message: ` No user with first name '${fname}' found.` };

        await deletedUser.destroy();
        return { message: ` User with first name '${fname}' deleted successfully.` };
    },

    updateUser: async (fullname: string, newfname: string, newlname: string) => {
        const user = await User.findOne({
            where: { fname: fullname.split(' ')[0], lname: fullname.split(' ')[1] }
        });

        if (!user) throw new GraphQLError(` No user found with name '${fullname}'.`);

        user.fname = newfname;
        user.lname = newlname;
        await user.save();

        return user.toJSON(); //  Convert Model instance to plain object
    },
};

export default userControllers;
