import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import zlib from "zlib";

export class CompressControler {
  static #instance = null;

  constructor() {
    if (CompressControler.#instance) {
      return CompressControler.#instance;
    }

    CompressControler.#instance = this;
  }

  async compressFile(pathFile, pathDestination) {
    const readStream = fs.createReadStream(pathFile);
    const writeStream = fs.createWriteStream(pathDestination);
    const brotli = zlib.createBrotliCompress();
    const pipelineAsync = promisify(pipeline);
    try {
      await pipelineAsync(readStream, brotli, writeStream);
      console.log("Compressed!");
    } catch (error) {
      console.log(error.message);
    }
  }

  async decompressFile(pathFile, pathDestination) {
    const readStream = fs.createReadStream(pathFile);
    const writeStream = fs.createWriteStream(pathDestination);
    const brotli = zlib.createBrotliDecompress();
    const pipelineAsync = promisify(pipeline);
    try {
      await pipelineAsync(readStream, brotli, writeStream);
      console.log("Decompressed!");
    } catch (error) {
      console.log(error.message);
    }
  }
}
