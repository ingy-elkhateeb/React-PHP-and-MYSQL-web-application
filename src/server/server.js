const express = require('express');
const cors = require('cors');
const app = express();

// Apply CORS middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

// Define your server-side routes and logic here

// const PORT = 8000;
// app.listen(PORT, function () {
//   console.log(`Server is running on port ${PORT}`);
// });
