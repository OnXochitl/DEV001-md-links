#!/usr/bin/env node
const { mdLinks } = require('../mdLinks');
const { stats, statsBroken } = require('../src/utils')

const options = process.argv;
const path = options[2];

const optionValidate = options.includes('--validate');
const optionStats = options.includes('--stats');
const optionsHelp = options.includes('--help');

const getURLInfoString = (infoURL, showHTTPInfo = false) => {
  const { file, href, text } = infoURL;
  if (showHTTPInfo) {
    const { ok, status, message } = infoURL;
    return `${file} ${href} ${ok} ${status} ${message} ${text}`;
  }
  return `${file} ${href} ${text}`;
}; 

const cli = (path, options) => {
  if (optionsHelp) {
    console.log('Welcome to mdLinks, is easy to use, just need the path and use options, like: \n--validate \n--stats \n--stats --validate \nor just the path');
  } else if (!optionValidate && !optionStats){
    mdLinks(path, { validate: false })
      .then((linksInfo) => {
        linksInfo.forEach((URLInfo)=> console.log(getURLInfoString(URLInfo, false)))
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (optionValidate && !optionStats) {
    mdLinks(path, { validate: true })
      .then((linksInfo) => {
        linksInfo.forEach((URLInfo)=> console.log(getURLInfoString(URLInfo, true)))
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (optionStats && !optionValidate) {
    mdLinks(path, { validate: false })
      .then((linksInfo) => {
        const { total, uniques } = stats(linksInfo);
        console.log(`Total: ${total}`);
        console.log(`Unique: ${uniques}`)
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (optionValidate && optionStats) {
    mdLinks(path, { validate: true })
      .then((linksInfo) => {
        const { total, uniques, broken} = statsBroken(linksInfo);
        console.log(`Total: ${total}`);
        console.log(`Unique: ${uniques}`);
        console.log(`Broken: ${broken}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

cli(path, options);