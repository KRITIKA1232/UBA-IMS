import { Request, Response } from 'express';
import { getUsers, saveUsers } from '../helpers/helper';

export const createUser = (req: Request, res: Response) => {
  const { fname, lname } = req.body;
  const users = getUsers();
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

export const updateUser = (req: Request, res: Response) => {
  const { fullname, newfname, newlname } = req.body;
  const users = getUsers();
  const user = users.find(
    (user) => `${user.fname} ${user.lname}` === fullname
  );

  if (user) {
    user.fname = newfname.trim();
    user.lname = newlname.trim();
    saveUsers(users);
    res.status(200).json({ message: `Updated: ${fullname} -> ${newfname} ${newlname}` });
  } else {
    res.status(404).json({ message: `No user found with name ${fullname}` });
  }
};
