import { exec } from "child_process";
import fs from "fs/promises";

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

process.stdin.on("data", (data) => {
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
  }

  console.log(process.cwd());
});
