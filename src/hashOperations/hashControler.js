import fs from "fs/promises";
import crypto from "crypto";

export class HashControler {
  static #instanse = null;

  constructor() {
    if (HashControler.#instanse) {
      return HashControler.#instanse;
    }
    HashControler.#instanse = this;
  }

  async getHash(path) {
    try {
      const file = await fs.readFile(path);
      const hashSum = crypto.createHash("sha256");
      hashSum.update(file);

      const hex = hashSum.digest("hex");
      console.log(hex);
    } catch (error) {
      console.log(error.message);
    }
  }
}
