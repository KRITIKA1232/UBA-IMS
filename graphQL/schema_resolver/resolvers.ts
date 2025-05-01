


// import { getUsers, saveUsers } from '../helpers/helper'; // Import helper functions
// import { GraphQLError } from 'graphql';

// // GraphQL Resolvers handle query and mutation requests
// export const resolvers = {
//   Query: {
//     // Fetch all users from the JSON file
//     getAllUsers: () => getUsers(),

//     // Fetch a single user based on first name
//     getUser: (_: any, args: { fname: string }) => {
//       const user = getUsers().find((user) => user.fname === args.fname);
//       if (!user) {
//         throw new Error(`User with first name '${args.fname}' not found.`);
//       }
//       return user;
//     },
//   },

//   Mutation: {
//     // Create a new user and save it to the JSON file
//     createUser: (_: any, args: { fname: string; lname: string }) => {
//       const users = getUsers(); // Retrieve existing users

//       // Check if the user already exists
//       const existingUser = users.find((user) => user.fname === args.fname && user.lname === args.lname);
//       if (existingUser) {
//         throw new Error(`User '${args.fname} ${args.lname}' already exists.`);
//       }

//       const newUser = { fname: args.fname.trim(), lname: args.lname.trim() }; // Create new user object
//       users.push(newUser); // Add new user to the list
//       saveUsers(users); // Save updated users list to file

//       return newUser; // Return the newly created user
//     },

//     // Delete a user by filtering out the matching user
//     deleteUser: (_: any, args: { fname: string }) => {
//       const users = getUsers();
//       const userIndex = users.findIndex((user) => user.fname === args.fname);

//       if (userIndex === -1) {
//         return { message: `No user with first name '${args.fname}' found.` }; // ✅ Clean error response
//       }

//       users.splice(userIndex, 1); // Remove user from the list
//       saveUsers(users); // Save updated list to file

//       return { message: `User '${args.fname}' deleted successfully.` };
//     },

//     // Update a user's first and last name
//     updateUser: (_: any, args: { fullname: string; newfname: string; newlname: string }) => {
//       const users = getUsers();
//       const userIndex = users.findIndex((user) => `${user.fname} ${user.lname}` === args.fullname);

//       if (userIndex === -1) {
//         throw new Error(`No user found with name '${args.fullname}'.`);
//       }

//       // Update user details
//       users[userIndex].fname = args.newfname.trim();
//       users[userIndex].lname = args.newlname.trim();
//       saveUsers(users); // Save updated users list

//       return users[userIndex]; // Return the updated user object
//     },
//   },
// };


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
