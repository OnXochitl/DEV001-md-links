const { mdLinks } = require('./mdLinks');
const chalk = require('chalk');
const { stats, statsBroken } = require('./src/utils')

const options = process.argv;
const path = options[2];

const optionValidate = options.includes('--validate');
const optionStats = options.includes('--stats');
const optionsHelp = options.includes('--help');


// console.log(options)

const cli = (path, options) => {
  if (path == undefined) {
    console.log(chalk.bgRedBright('escriba de nuevo'));
  } else if (optionsHelp) {
    console.log(chalk.bgGreen('escribio ayuda'));
  } else if (optionValidate && !optionStats) {
    mdLinks(path, { validate: true })
      .then((linksInfo) => {
        console.log(linksInfo);
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (optionStats && !optionValidate) {
    mdLinks(path, { validate: false })
      .then((linksInfo) => {
        console.log(stats(linksInfo));
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (optionValidate && optionStats) {
    mdLinks(path, { validate: true })
      .then((linksInfo) => {
        console.log(statsBroken(linksInfo));
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

cli(path, options);