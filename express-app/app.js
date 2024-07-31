const exports = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();

// parses form payloads and sets it to the 'req.boy'
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
});

app.use("/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
