import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();
const DATA_FILE = path.join(__dirname, 'users.json');

// Define the User interface
interface User {
  fname: string;
  lname: string;
  
}

// Ensure users.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper functions
const getUsers = (): User[] => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error("Error reading users file:", (error as Error).message);
    return [];
  }
};

const saveUsers = (users: User[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

// Create user
program
  .command('create <fname> <lname>')
  .description('Create a new user')
  .action((fname: string, lname: string) => {
    const users = getUsers();
    users.push({ fname, lname });
    saveUsers(users);
    console.log(`User ${fname} ${lname} created successfully.`);
  });

// List users
program
  .command('list')
  .description('List all users')
  .action(() => {
    const users = getUsers();
    console.table(users);
  });

// Delete user
program
  .command('delete <fname>')
  .option('--all', 'Delete all users with the given first name')
  .description('Delete a user by first name')
  .action((fname: string, options: { all?: boolean }) => {
    let users = getUsers();

    if (options.all) {
      users = users.filter(user => user.fname !== fname);
    } else {
      const index = users.findIndex(user => user.fname === fname);
      if (index !== -1) {
        users.splice(index, 1);
      }
    }

    saveUsers(users);
    console.log(`User(s) with first name ${fname} deleted.`);
  });

// Update user
program
  .command('update <fullname> <newfname> <newlname>')
  .description("Update a user's first and last name")
  .action((fullname: string, newfname: string, newlname: string) => {
    const users = getUsers();
    const user = users.find(
      user => `${user.fname} ${user.lname}` === fullname
    );

    if (user) {
      user.fname = newfname.trim();
      user.lname = newlname.trim();
      saveUsers(users);
      console.log(`Updated user: ${fullname} -> ${newfname} ${newlname}`);
    } else {
      console.log(`No user found with name ${fullname}`);
    }
  });

program.parse(process.argv);
