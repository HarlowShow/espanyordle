import { writeFile, readFile, readFileSync } from "node:fs";
import { removeAccentsString } from "./removeaccents.mjs";

// script to avoid formatting 10,000 words manually

const readDataToWrite = async () => {
  let data = "no data found";
  try {
    const readData = readFileSync("./unformattedwordlist.txt", "utf8");
    data = readData;
  } catch (err) {
    console.error(err);
  }
  return data;
};

const formatData = async () => {
  const withCommas = [];
  const data = await readDataToWrite();
  // split words into an array
  const split = data.split(" ");
  // add a comma to each word
  split.forEach((word) => {
    const noAccents = removeAccentsString(word)
    // console.log(noAccents)
    withCommas.push(`\'${noAccents}\',`);
  });
  const joined = withCommas.join(" ");
  return joined
};

const writeData = async () => {
  // const data = await formatData();
  // console.log("writing file");
  writeFile("./writefiletest.txt", data, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};

writeData();
