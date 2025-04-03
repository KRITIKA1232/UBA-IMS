// Import required modules
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const DATA_FILE = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper function to read and write users
const getUsers = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveUsers = (users) => fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

// Command to create a new user
program
    .command('create <fname> <lname>')
    .description('Create a new user')
    .action((fname, lname) => {
        let users = getUsers();
        users.push({ fname, lname });
        saveUsers(users);
        console.log(`User ${fname} ${lname} created successfully.`);
    });

// Command to list all users
program
    .command('list')
    .description('List all users')
    .action(() => {
        let users = getUsers();
        console.table(users);
    });

// Command to delete a user
program
    .command('delete <fname>')
    .option('--all', 'Delete all users with the given first name')
    .description('Delete a user by first name')
    .action((fname, options) => {
        let users = getUsers();
        if (options.all) {
            users = users.filter(user => user.fname !== fname);
        } else {
            const index = users.findIndex(user => user.fname === fname);
            if (index !== -1) users.splice(index, 1);
        }
        saveUsers(users);
        console.log(`User(s) with first name ${fname} deleted.`);
    });


//update
program
    .command("update <fullname> <newfname> <newlname>")
    .description("Update a user's first and last name")
    .action((fullname, newfname, newlname) => {
        let users = getUsers();
        let user = users.find((user) => `${user.fname} ${user.lname}` === fullname);

        if (user) {
            user.fname = newfname.trim();
            user.lname = newlname.trim();
            saveUsers(users);
            console.log(`Updated user: ${fullname} -> ${newfname} ${newlname}`);
        } else {
            console.log(`No user found with name ${fullname}`);
        }
    });



// Parse command-line arguments
program.parse(process.argv);
