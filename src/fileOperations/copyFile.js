import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

export const copyFile = async (oldFile, newFile) => {
  const pipelineAsync = promisify(pipeline);
  try {
    await pipelineAsync(
      fs.createReadStream(oldFile),
      fs.createWriteStream(newFile)
    );
    console.log("Copied!");
  } catch (error) {
    console.error(error.message);
  }
};
