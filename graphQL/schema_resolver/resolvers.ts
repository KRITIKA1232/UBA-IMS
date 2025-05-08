

import userControllers from '../controllers/userControllers';

export const resolvers = {
  Query: {
    getAllUsers: async () => await userControllers.getAllUsers(),
    getUser: async (_: any, args: { fname: string }) => await userControllers.getUser(args.fname),
  },

  Mutation: {
    createUser: async (_: any, args: { fname: string; lname: string }) =>
      await userControllers.createUser(args.fname, args.lname),

    deleteUser: async (_: any, args: { fname: string }) =>
      await userControllers.deleteUser(args.fname),

    updateUser: async (_: any, args: { fullname: string; newfname: string; newlname: string }) =>
      await userControllers.updateUser(args.fullname, args.newfname, args.newlname),
  },
};
