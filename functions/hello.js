exports.handler = async (event, context) => {
  let data = {};

  if (event.httpMethod === "POST") {
    try {
      data = JSON.parse(event.body);
    } catch (err) {
      console.log("Unable to parse event body! Are you passing it correctly?");
    }
  }
  console.log("data", data);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Serverless Functions are cool! 😎",
      data,
    }),
  };
};
