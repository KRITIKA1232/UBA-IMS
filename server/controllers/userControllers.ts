import { Request, Response } from 'express';
import { getUsers, saveUsers } from '../helpers/helper';

export const createUser = (req: Request, res: Response) => {
  const { fname, lname } = req.body;

  //Missing user data check
  if (!fname || !lname) {
    res.status(400).json({ message: 'Missing user data.' });
    return;
  }

  //Invalid user data check
  // Check if fname and lname are strings
  if (typeof fname !== 'string' || typeof lname !== 'string') {
    res.status(400).json({ message: 'Invalid user data.' });
    return;
  }


  const users = getUsers();
  // Check for duplicate user
  const duplicateUser = users.find(
    (user) => user.fname === fname && user.lname === lname
  );
  if (duplicateUser) {
    res.status(400).json({ message: `User ${fname} ${lname} already exists.` });
    return;
  }
  users.push({ fname, lname });
  saveUsers(users);
  res.status(201).json({ message: `User ${fname} ${lname} created.` });
};

export const getAllUsers = (_req: Request, res: Response) => {
  const users = getUsers();
  res.status(200).json(users);
};

export const deleteUser = (req: Request, res: Response) => {
  const { fname } = req.params;
  const users = getUsers().filter((user) => user.fname !== fname);
  saveUsers(users);
  res.status(200).json({ message: `User(s) with first name ${fname} deleted.` });
};


// export const updateUser = (req: Request, res: Response) => {
//   const { fname, lname } = req.body;
//   const users = getUsers();

//   //Missing user data check
//   if (!fname || !lname) {
//     res.status(400).json({ message: 'Missing user data.' });
//     return;
//   }

//   //Invalid user data check
//   // Check if fname and lname are strings
//   if (typeof fname !== 'string' || typeof lname !== 'string') {
//     res.status(400).json({ message: 'Invalid user data.' });
//     return;
//   }

//   const userIndex = users.findIndex((user) => user.fname === fname);
//   if (userIndex === -1) {
//     res.status(404).json({ message: `User ${fname} not found.` });
//     return;
//   }
//   users[userIndex].lname = lname;
//   saveUsers(users);
//   res.status(200).json({ message: `User ${fname} updated.` });
// };

// export const updateUser = (req: Request, res: Response): Response => {
//   const { fullname, newfname, newlname } = req.body;
//   const users = getUsers();

//   // Validate missing user data
//   if (!fullname || !newfname || !newlname) {
//     return res.status(400).json({ message: 'Missing user data.' });
//   }

//   // Validate data types
//   if (typeof fullname !== 'string' || typeof newfname !== 'string' || typeof newlname !== 'string') {
//     return res.status(400).json({ message: 'Invalid user data.' });
//   }

//   const trimmedFullname = fullname.trim();
//   const trimmedNewFname = newfname.trim();
//   const trimmedNewLname = newlname.trim();

//   // Find user (case-insensitive)
//   const user = users.find(
//     (user) => `${user.fname.toLowerCase()} ${user.lname.toLowerCase()}` === trimmedFullname.toLowerCase()
//   );

//   if (!user) {
//     return res.status(404).json({ message: `No user found with name ${trimmedFullname}` });
//   }

//   // Update user details
//   user.fname = trimmedNewFname;
//   user.lname = trimmedNewLname;
//   saveUsers(users);

//   return res.status(200).json({ message: `Updated: ${trimmedFullname} -> ${trimmedNewFname} ${trimmedNewLname}` });
// };


export const updateUser = (req: Request, res: Response): void => {
  const { fullname, newfname, newlname } = req.body;
  const users = getUsers();

  // // Validate missing user data
  // if (!fullname || !newfname || !newlname) {
  //   res.status(400).json({ message: 'Missing user data.' });
  //   return;
  // }

  // Validate data types
  // if (typeof fullname !== 'string' || typeof newfname !== 'string' || typeof newlname !== 'string') {
  //   res.status(400).json({ message: 'Invalid user data.' });
  //   return;
  // }

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
};
