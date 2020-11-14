exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Serverless Background Functions are cool! 😎",
    }),
  };
};
