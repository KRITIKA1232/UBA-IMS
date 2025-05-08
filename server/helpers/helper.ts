import * as fs from 'fs';
import * as path from 'path';

// const data_file = path.join(__dirname, '../server/users.json');
const DATA_FILE = path.join(__dirname, '../../users.json');


// Define the User interface
export interface User {
    fname: string;
    lname: string;
}


// Helper Functions
export const getUsers = (): User[] => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');

    // Check for empty file
    if (!data.trim()){
      console.error("The JSON file is empty.");
      return [];
    }

    return JSON.parse(data) as User[];
  } catch (error) {
    console.error("Error reading users file:", (error as Error).message);
    return [];
  }
};  


//function to save users 
export const saveUsers = (users: User[]): void => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  };
  