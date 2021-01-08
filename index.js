import express from 'express';
import assignmentRouter from "./routes/assignmentRouter.js"

const app = express();
app.use(express.json());

app.use("/", assignmentRouter);

app.listen(8080, () => {
  console.log("API Started!");
})