// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('UBAIMS', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(' Database Connected Successfully');
//   } catch (error) {
//     console.error(' Database Connection Failed:', error);
//     process.exit(1);
//   }
// };

// export { sequelize, connectDB };


import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Loads environment variables

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST!,
        dialect: 'mysql',
        logging: false, // ✅ Disables verbose logging
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database Connection Failed:', error);
        process.exit(1);
    }
};

export { sequelize, connectDB };
