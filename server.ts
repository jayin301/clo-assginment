import app from "./src";
import logger from "./src/config/logger";

const port = process.env.PORT || 8888;
app.listen(port, () => logger.info(`Server is listening on port ${port}!`));
