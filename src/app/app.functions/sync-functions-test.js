const axios = require("axios");

exports.main = (context = {}, sendResponse) => {
  const { action } = context.parameters;

  console.log("Running app functions test for: ", action);

  const handleResponse = (action, joke) => {
    const message = `Sending response from ${action}: ${joke}`;
    console.log(message);
    sendResponse(message);
  };

  switch (action) {
    case "simple-response":
      handleResponse(action, "Some hard-coded joke that's funny");
    case "await-request":
      // NOTE: Cannot do this because the function must be async to use await
      handleResponse(action, "NOT A VALID USE OF SYNC FUNCTIONS");
      break;
    case "return-promise":
      return axios
        .get("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          handleResponse(action, res.data.joke);
        });
    case "promise-no-return":
      axios
        .get("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          handleResponse(action, res.data.joke);
        });
      break;
    case "throw-error":
      throw new Error("Throwing an error");
    case "return-undefined":
      sendResponse(undefined);
    case "do-nothing":
      break;
    default:
      handleResponse(action, "Unknown action type");
  }
};
