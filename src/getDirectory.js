const chalk = require("chalk");
const fs = require('fs');

const isThisPathDirectory = (paths) => { fs.stat(paths, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(chalk.bgCyan(stats.isDirectory()));
});}

isThisPathDirectory('test');