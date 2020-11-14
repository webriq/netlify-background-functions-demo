const fetch = require("node-fetch");
const sleep = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, +seconds * 1000);
  });

exports.handler = async (event, context) => {
  const { SITE_URL } = process.env;
  const destination = `${
    SITE_URL || "http://localhost:8888"
  }/.netlify/functions/hello`;
  const timeout = 30; // seconds

  // Simulating fake long running sequence
  console.log(
    `[INIT] Beginning to process data. This may take a while ~${timeout} seconds...`
  );
  await sleep(timeout); // seconds
  console.log(`[SUCCESS] Done processing after ${timeout} seconds...`);
  console.log(`Sending data to destination: ${destination}...`);

  // Sending data to a destination
  fetch(destination, {
    method: "POST",
    body: JSON.stringify({
      message: `Successfully processed request with ID: ${
        Math.random() * 1000
      }`,
      date: new Date().toGMTString(),
    }),
  });

  // Workaround: not to fail function as it gets treated as normal one
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};
