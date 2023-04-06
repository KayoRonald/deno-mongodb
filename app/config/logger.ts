import { log } from '../deps.ts';
await log.setup({
  //define handlers
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: "[{levelName}] {msg}",
    }),
  },
  //assign handlers to loggers  
  loggers: {
    default: {
      level: "DEBUG",
    },
    client: {
      level: "INFO",
    },
  },
});

const logger = log.getLogger();

export default logger