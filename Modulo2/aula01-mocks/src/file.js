const { readFile } = require("fs/promises");
const User = require("./user");
const { error } = require("./constants");
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    console.log(validation, "validation");
    if (!validation.valid) throw new Error(validation.error);

    const users = File.parseCSVToJSON(content);
    return users;
  }

  static async getFileContent(filePath) {
    // const filename = join(__dirname);
    return (await readFile(filePath)).toString("utf8");
  }
  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\r\n");
    fileWithoutHeader.pop();
    const isHeaderValid = header == options.fields.join(",");
    // console.log(header, "header");
    // console.log(options.fields.join(","), "options with join");
    // console.log(fileWithoutHeader, "length fileWithoutHeader");
    // console.log(isHeaderValid, "isHeaderValid");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }
  static parseCSVToJSON(csvString) {
    const lines = csvString.split("\r\n");
    // remove o primeiro item e joga na variável
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      // console.log(user, "userrrrrr");
      return new User(user);
    });
    console.log("users", users);
  }
}

// (async () => {
//   const result = await File.csvToJson("./../mocks/threeItems-valid.csv");
//   //   const result = await File.csvToJson("./../mocks/fourItems-invalid.csv");
//   //   const result = await File.csvToJson("./../mocks/invalidheader.csv");
//   console.log("result", result);
// })();

module.exports = File;
