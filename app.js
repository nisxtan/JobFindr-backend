import express from "express";
import dotenv from "dotenv";

const app = express();
//defining a path to the config file.
dotenv.config({ path: "./config/config.env" });

export default app;
