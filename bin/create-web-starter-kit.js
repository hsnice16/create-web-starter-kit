#!/usr/bin/env node

const { execSync } = require("child_process");
const chalk = require("chalk");

const enteredDirName = process.argv[2];
if (!enteredDirName) {
  console.log(chalk.red("Hypenated project name is required."));
  process.exit(-1);
}

/**
 * Function to execute cli command synchronously
 *
 * @param {string} command - cli command
 * @returns boolean
 */
function execCommand(command) {
  try {
    execSync(`${command}`, { stdio: "inherit" });
    return true;
  } catch (error) {
    console.error(`Failed to execute command ${command}`, error);
    return false;
  }
}

const isWindowPlatform = process.platform === "win32";
const RUN_COMMAND = {
  CLONE: `git clone https://github.com/hsnice16/web-starter-kit ${enteredDirName}`,
  REMOVE_GIT: `cd ${enteredDirName} && ${
    isWindowPlatform ? "del .git" : "rm -rf .git"
  }`,
  INITIALIZE_GIT: `cd ${enteredDirName} && git init`,
  CHANGE_BRANCH: `cd ${enteredDirName} && git add . && git commit -m "initial commit" && git branch -m main`,
};

console.log(
  `Creating ${enteredDirName} folder with the Web Starter Kit template code`
);

if (!execCommand(RUN_COMMAND.CLONE)) process.exit(-1);
if (!execCommand(RUN_COMMAND.REMOVE_GIT))
  console.error("Failed to remove git. Please do it manually.");
if (!execCommand(RUN_COMMAND.INITIALIZE_GIT))
  console.error("Failed to initialize git. Please do it manually.");
if (!execCommand(RUN_COMMAND.CHANGE_BRANCH))
  console.error("Failed to change the branch. Please do it manually.");

console.log(chalk.green("Successfully created 🎉!"));
console.log(chalk.yellow("Happy coding, 💻"));
process.exit(0);
