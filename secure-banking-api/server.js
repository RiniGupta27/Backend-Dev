require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║         🏦  Secure Banking API             ║');
    console.log('╠════════════════════════════════════════════╣');
    console.log(`║  Server running on port  : ${PORT}              ║`);
    console.log(`║  Environment             : ${process.env.NODE_ENV || 'development'}      ║`);
    console.log('║                                            ║');
    console.log('║  Endpoints:                                ║');
    console.log('║  POST /api/auth/register                   ║');
    console.log('║  POST /api/auth/login                      ║');
    console.log('║  POST /api/auth/refresh                    ║');
    console.log('║  POST /api/auth/logout                     ║');
    console.log('║  GET  /api/auth/me                         ║');
    console.log('║  POST /api/accounts                        ║');
    console.log('║  GET  /api/accounts/me                     ║');
    console.log('║  GET  /api/accounts/all  [admin]           ║');
    console.log('║  POST /api/transactions/deposit            ║');
    console.log('║  POST /api/transactions/withdraw           ║');
    console.log('║  POST /api/transactions/transfer           ║');
    console.log('║  GET  /api/transactions/history/:id        ║');
    console.log('║  GET  /health                              ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
  });
};

startServer();
