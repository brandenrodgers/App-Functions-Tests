import React from "react";
import { Divider, Button, Text, Flex, hubspot } from "@hubspot/ui-extensions";

hubspot.extend(({ runServerlessFunction, actions }) => (
  <FunctionsTestCard
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

const FunctionsTestCard = ({ runServerless, sendAlert }) => {
  const executeFunction = (functionName, action) => {
    runServerless({ name: functionName, parameters: { action } }).then(
      (resp) => {
        console.log("Value received in component: ", resp);
        sendAlert({ message: resp.response });
      }
    );
  };

  const renderButtons = (functionName) => {
    return (
      <Flex direction="row" align="end" gap="small" wrap="wrap">
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "simple-response")}
        >
          Simple response
        </Button>
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "await-request")}
        >
          Use await
        </Button>
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "return-promise")}
        >
          Return a promise
        </Button>
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "promise-no-return")}
        >
          Use a promise without returning
        </Button>
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "throw-error")}
        >
          Throw an error
        </Button>
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "return-undefined")}
        >
          Return undefined
        </Button>
        <Button
          type="submit"
          onClick={() => executeFunction(functionName, "do-nothing")}
        >
          Do nothing
        </Button>
      </Flex>
    );
  };

  return (
    <>
      <Text format={{ fontWeight: "bold" }}>
        Use this card to test out different types of app functions
      </Text>
      <Divider />
      <Text format={{ fontWeight: "bold" }}>Sync App Function Actions</Text>
      {renderButtons("syncFunction")}
      <Divider />
      <Text format={{ fontWeight: "bold" }}>Async App Function Actions</Text>
      {renderButtons("asyncFunction")}
    </>
  );
};
