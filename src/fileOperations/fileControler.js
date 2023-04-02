import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

export class FileControler {
  static #instance = null;

  constructor() {
    if (FileControler.#instance) {
      return FileControler.#instance;
    }

    FileControler.#instance = this;
  }

  catFile(path) {
    const readStream = fs.createReadStream(path);

    readStream.on("data", (data) => {
      console.log(data.toString());
    });
    readStream.on("error", (error) => {
      console.log(error.message);
    });
  }

  async createFile(path) {
    let fileHandle;

    try {
      fileHandle = await fs.promises.open(path, "w");
      console.log("Saved!");
    } catch (error) {
      console.log(error.message);
    } finally {
      await fileHandle.close();
    }
  }

  async renameFile(oldFile, newFile, action) {
    try {
      await fs.promises.rename(oldFile, newFile);
      if (action === "rn") {
        console.log("Renamed!");
      } else {
        console.log("Moved!");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async copyFile(oldFile, newFile) {
    const pipelineAsync = promisify(pipeline);
    try {
      await pipelineAsync(
        fs.createReadStream(oldFile),
        fs.createWriteStream(newFile)
      ).then(() => console.log("Copied!"));
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteFile(filePath) {
    try {
      await fs.promises.unlink(filePath);
      console.log("Deleted");
    } catch (error) {
      console.log(error.message);
    }
  }
}
