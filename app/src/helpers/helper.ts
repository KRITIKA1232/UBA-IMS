import AppDataSource from "../config/db";
import { User } from "../entities/User";

/**
 * Fetch all users from the database
 */
export const getUsers = async (): Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find(); // ✅ Retrieves users from MySQL
};

/**
 * Save a new user in the database
 */
export const saveUser = async (fname: string, lname: string): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({ fname, lname });

    return await userRepository.save(newUser); // ✅ Saves user to MySQL
};

/**
 * Fetch a single user by first name (case-insensitive)
 */
export const getUserByFirstName = async (fname: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOne({ where: { fname } }); // ✅ Finds user in MySQL
};

/**
 * Delete a user by first name (case-insensitive)
 */
export const deleteUser = async (fname: string): Promise<boolean> => {
    const userRepository = AppDataSource.getRepository(User);
    const userToDelete = await userRepository.findOne({ where: { fname } });

    if (!userToDelete) return false; // ❌ User not found

    await userRepository.remove(userToDelete); // ✅ Deletes from MySQL
    return true;
};

/**
 * Update user details
 */
export const updateUser = async (fullname: string, newfname: string, newlname: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);

    const userToUpdate = await userRepository.findOne({
        where: { fname: fullname.split(" ")[0], lname: fullname.split(" ")[1] }
    });

    if (!userToUpdate) return null; // ❌ User not found

    userToUpdate.fname = newfname;
    userToUpdate.lname = newlname;

    return await userRepository.save(userToUpdate); // ✅ Updates user in MySQL
};
