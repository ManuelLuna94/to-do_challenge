import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (eventOrValue) => {
    if (typeof eventOrValue === "object")
      return setValue(eventOrValue.target.value);
    setValue(eventOrValue);
  };

  return [value, updateValue];
}

export default useInput;
