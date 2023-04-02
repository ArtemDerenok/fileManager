import { OsControler } from "./osOperations/osControler.js";
import { HashControler } from "./hashOperations/hashControler.js";
import { CompressControler } from "./compressOperations/compressControler.js";
import { FileControler } from "./fileOperations/fileControler.js";
import { NavigationControler } from "./navigationOperations/navigatonControler.js";

console.log(
  `Welcome to the File Manager, ${
    process.env.npm_config_username
      ? process.env.npm_config_username
      : "Anonymous"
  }!`
);

process.chdir("C:/");

process.stdin.on("data", (data) => {
  const values = data.toString().trim().split(" ");

  if (values[0] === "up") {
    new NavigationControler().upMove();
  } else if (values[0] === "cd") {
    const path = values.slice(1).join(" ");
    new NavigationControler().cdMove(path);
  } else if (values[0] === "ls") {
    new NavigationControler().lsFiles(values);
  } else if (values[0] === "cat") {
    const path = values.slice(1).join(" ");
    new FileControler().catFile(path);
  } else if (values[0] === "add") {
    const path = values.slice(1).join(" ");
    new FileControler().createFile(path);
  } else if (values[0] === "rn") {
    new FileControler().renameFile(values[1], values[2], values[0]);
  } else if (values[0] === "cp") {
    new FileControler().copyFile(values[1], values[2]);
  } else if (values[0] === "mv") {
    new FileControler().renameFile(values[1], values[2], values[0]);
  } else if (values[0] === "rm") {
    const path = values.slice(1).join(" ");
    new FileControler().deleteFile(path);
  } else if (values[0] === "os" && values[1] === "--EOL") {
    new OsControler().getEOL();
  } else if (values[0] === "os" && values[1] === "--cpus") {
    new OsControler().getCpus();
  } else if (values[0] === "os" && values[1] === "--username") {
    new OsControler().getSystemUserInfo(values[1]);
  } else if (values[0] === "os" && values[1] === "--homedir") {
    new OsControler().getSystemUserInfo(values[1]);
  } else if (values[0] === "os" && values[1] === "--architecture") {
    new OsControler().getCpuArchitecture();
  } else if (values[0] === "hash") {
    const path = values.slice(1).join(" ");
    new HashControler().getHash(path);
  } else if (values[0] === "compress") {
    new CompressControler().compressFile(values[1], values[2]);
  } else if (values[0] === "decompress") {
    new CompressControler().decompressFile(values[1], values[2]);
  }
});
