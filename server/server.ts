import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

// Constants
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(express.json());

// Define the User interface
interface User {
  fname: string;
  lname: string;
}

// Helper Functions
const getUsers = (): User[] => {
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

const saveUsers = (users: User[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};


//Root route
app.get('/', (req: Request, res: Response) => {
  res.send("CRUD API");
})

//api endpoints
app.post('/users', (req: Request, res: Response) => {
    const { fname, lname } = req.body;
    const users = getUsers();
    users.push({ fname, lname });
    saveUsers(users);
    res.status(201).json({ message: `User ${fname} ${lname} created successfully.` });

});


app.get('/users', (req: Request, res: Response) => {
    const users = getUsers();
    res.status(200).json(users);
});



app.delete('/users/:fname', (req: Request, res: Response) => {
    const { fname } = req.params;
    const users = getUsers().filter(user => user.fname !== fname);
    saveUsers(users);
    res.status(200).json({ message: `User(s) with first name ${fname} deleted.` });
});


app.put('/users', (req: Request, res: Response) => {
    const { fullname, newfname, newlname } = req.body;
    const users = getUsers();
    const user = users.find(user => `${user.fname} ${user.lname}` === fullname);

    if (user) {
        user.fname = newfname.trim();
        user.lname = newlname.trim();
        saveUsers(users);
        res.status(200).json({ message: `Updated user: ${fullname} -> ${newfname} ${newlname}` });
    } else {
        res.status(404).json({ message: `No user found with name ${fullname}` });
    }
});


// Run Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});












