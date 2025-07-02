import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'


dotenv.config();
connectToDatabase();
const app=express();

const corsOptions = {
    origin: "https://employee-salary-leave-frontend-p7qr.vercel.app", // Your frontend URL
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/setting',settingRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
