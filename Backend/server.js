const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSocket } = require('./Realtime/socket.server');
const { setupSocket } = require('./Realtime/sessions.events');
const { connectDB } = require('./Config/db');
const sessionRouter = require('./Routes/sessionRoutes');
const authRouter = require('./Routes/authRoutes');
const metricsRouter = require('./Routes/metricsRoutes');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRouter);
app.use('/api/session', sessionRouter);
app.use('/api/metrics', metricsRouter);

const server = http.createServer(app);
const io = initSocket(server);
setupSocket(io);

app.get('/', (req,res) => {
    return res.status(200).json({
        success: true,
        message: 'Home route is working'
    })
});

server.listen(8000, "0.0.0.0", () => {
    console.log('App + WS Server is listening on the port');
});