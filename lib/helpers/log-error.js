// TODO: save logs to filesystem
const logError = error => {
  console.log("\x1b[31m%s\x1b[0m", error);
  return false;
};

module.exports = logError;
