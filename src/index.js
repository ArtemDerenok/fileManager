import { exec } from "child_process";
import fs from "fs/promises";
import { catFile } from "./fileOperations/catFile.js";
import { createFile } from "./fileOperations/createFile.js";

console.log(
  `Welcome to the File Manager, ${
    process.env.npm_config_username
      ? process.env.npm_config_username
      : "Anonymous"
  }!`
);

process.chdir("G:/");

const getFileList = async () => {
  try {
    const files = await fs.readdir(process.cwd());
    console.table(files);
  } catch (error) {
    console.error(error);
  }
};

getFileList();

process.stdin.on("data", async (data) => {
  const values = data.toString().trim().split(" ");

  if (values[0] === "up") {
    process.chdir("..");
    getFileList();
  } else if (values[0] === "cd") {
    const path = values.slice(1).join(" ");

    try {
      process.chdir(path);
      getFileList();
    } catch (error) {
      console.error("No such file or directory.");
    }
  } else if (values[0] === "ls") {
    exec(`${values.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        getFileList();
      } else {
        console.table(stdout.trim().split("\n"));
      }
    });
  } else if (values[0] === "cat") {
    const path = values.slice(1).join(" ");
    catFile(path);
  } else if (values[0] === "add") {
    const path = values.slice(1).join(" ");
    await createFile(path);
  }

  console.log(process.cwd());
});
