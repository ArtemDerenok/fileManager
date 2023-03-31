import os from "os";

export class OsControler {
  static #instance = null;

  constructor() {
    if (OsControler.#instance) {
      return OsControler.#instance;
    }
    OsControler.#instance = this;
  }

  getEOL() {
    console.log(JSON.stringify(os.EOL));
  }

  getCpus() {
    const data = os.cpus();
    const result = `Number of Cores: ${data.length}${os.EOL}${data
      .map((elem) => `${elem.model}${os.EOL}`)
      .join("")}`;
    console.log(result);
  }

  getSystemUserInfo(flag) {
    if (flag === "--username") {
      console.log(os.userInfo().username);
    } else {
      console.log(os.userInfo().homedir);
    }
  }

  getCpuArchitecture() {
    console.log(process.arch);
  }
}
