// import express, { Request, Response } from 'express';
// import { getUsers, saveUsers, User } from './helper';

// // Constants
// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());

// //Root route
// app.get('/', (req: Request, res: Response) => {
//   res.send("CRUD API");
// })

// //api endpoints
// app.post('/users', (req: Request, res: Response) => {
//     const { fname, lname } = req.body;
//     const users = getUsers();
//     users.push({ fname, lname });
//     saveUsers(users);
//     res.status(201).json({ message: `User ${fname} ${lname} created successfully.` });

// });


// app.get('/users', (req: Request, res: Response) => {
//     const users = getUsers();
//     res.status(200).json(users);
// });


// app.delete('/users/:fname', (req: Request, res: Response) => {
//     const { fname } = req.params;
//     const users = getUsers().filter(user => user.fname !== fname);
//     saveUsers(users);
//     res.status(200).json({ message: `User(s) with first name ${fname} deleted.` });
// });


// app.put('/users', (req: Request, res: Response) => {
//     const { fullname, newfname, newlname } = req.body;
//     const users = getUsers();
//     const user = users.find(user => `${user.fname} ${user.lname}` === fullname);

//     if (user) {
//         user.fname = newfname.trim();
//         user.lname = newlname.trim();
//         saveUsers(users);
//         res.status(200).json({ message: `Updated user: ${fullname} -> ${newfname} ${newlname}` });
//     } else {
//         res.status(404).json({ message: `No user found with name ${fullname}` });
//     }
// });


// // Run Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




import express from 'express';
import userRoutes from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








