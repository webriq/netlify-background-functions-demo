const fetch = require("node-fetch");
const sleep = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, +seconds * 1000);
  });

exports.handler = async (event, context) => {
  const timeout = 30; // seconds

  // Simulating fake long running sequence
  console.log(
    `[INIT] Beginning to process data. This may take a while ~${timeout} seconds...`
  );
  await sleep(timeout); // seconds
  console.log(
    `[STILL PROCESSING] Still processing but we'll expect this will fail eventually...`
  );

  sleeeeep(""); // causes error

  console.log(`[ERROR] And it failed!`);

  // Workaround: not to fail function as it gets treated as normal one
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};
