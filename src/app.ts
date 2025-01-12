import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api", router);

// const getController = (req: Request, res: Response) => {
//   res.send("Car-wash app");
// };

// app.get("/", getController);
app.use(globalErrorHandler);
app.use(notFound);

// console.log(process.cwd());

export default app;
