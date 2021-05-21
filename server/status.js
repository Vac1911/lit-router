const chalk = require('chalk');

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execCmd(cmd) {
    const exec = require("child_process").exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

/**
 * Check if port is being used
 * @param port {Number}
 * @return {String|false} Get pid using the port, or false if the port is open
 */
function checkPort(port) {
    const execSync = require("child_process").execSync;
    try {
        return execSync(`lsof -t -i:${port}`).toString();
    } catch (error) {
        error.status; // Might be 127 in your example.
        error.message; // Holds the message you typically want.
        error.stderr; // Holds the stderr output. Use `.toString()`.
        error.stdout; // Holds the stdout output. Use `.toString()`.
        return false;
    }
}

function error(msg) {
    const margin = 4;
    msg = " ".repeat(4) + msg + " ".repeat(4);
    console.log(chalk.bold.bgRed(`${" ".repeat(msg.length)}\n${msg}\n${" ".repeat(msg.length)}`));
}

module.exports = { execCmd, checkPort, error };
