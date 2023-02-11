import "express-async-errors";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

import ErrorHandler from "./middleware/errorMiddleware";
import AppRoutes from "./routes/app.routes";
import AuthRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes
app.use(AuthRoutes);
app.use(AppRoutes);

app.use(ErrorHandler);

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
