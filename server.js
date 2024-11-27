const express = require(`express`);
const mongoose = require(`mongoose`);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  `mongodb+srv://joshuapranata5:291106joshua@tugas.ufflv.mongodb.net/?retryWrites=true&w=majority&appName=tugas/modul`
);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "connection error: "));
db.once(`open`, function () {
  console.log(`Connected to MongoDB <Nama>`);
});

app.listen(PORT, () =>
  console.log(`Server Started at port: ${PORT}
`)
);
