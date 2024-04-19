import app from "@/app";
import logger from "@/configs/logger";

const PORT = 9999;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGINT", () => {
  server.close(() => {
    logger.info("Exit server express");
    // notify when server crash
  });
});
