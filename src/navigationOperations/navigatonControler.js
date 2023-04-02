import { exec } from "child_process";
import fs from "fs/promises";

export class NavigationControler {
  static #instance = null;

  constructor() {
    if (NavigationControler.#instance) {
      return NavigationControler.#instance;
    }

    NavigationControler.#instance = this;
  }

  async _getFileList() {
    try {
      const files = await fs.readdir(process.cwd());
      console.table(files);
    } catch (error) {
      console.error(error);
    }
  }

  upMove() {
    process.chdir("..");
    this._getFileList();
  }

  async cdMove(path) {
    try {
      process.chdir(path);
      this._getFileList();
    } catch (error) {
      console.error("No such file or directory.");
    }
  }

  lsFiles(values) {
    exec(`${values.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        this._getFileList();
      } else {
        console.table(stdout.trim().split("\n"));
      }
    });
  }
}
