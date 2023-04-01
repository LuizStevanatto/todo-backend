import { app } from "./app";
import * as dotenv from "dotenv";
import AppDataSource from "./database/connection";

dotenv.config();

const PORT = process.env.PORT || 3000;

import "./database/connection";

app.listen(PORT, async () => {
	await AppDataSource.initialize();
	console.log(`Server is running on PORT:${PORT}`);
});
