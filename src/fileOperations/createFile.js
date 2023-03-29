import fs from "fs/promises";

export const createFile = async (path) => {
  let fileHandle;

  try {
    fileHandle = await fs.open(path, "w");
    console.log("Saved!");
  } catch (error) {
    console.log(error.message);
  } finally {
    await fileHandle.close();
  }
};
