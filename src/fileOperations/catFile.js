import fs from "fs";

export const catFile = (path) => {
  const readStream = fs.createReadStream(path);

  readStream.on("data", (data) => {
    console.log(data.toString());
  });
  readStream.on("error", (error) => {
    console.log(error.message);
  });
};
