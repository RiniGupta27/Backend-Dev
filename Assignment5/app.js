const express = require("express");
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
