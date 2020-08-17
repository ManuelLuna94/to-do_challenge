import { useState } from "react";

function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const updateValue = () => setValue(!value);

  return [value, updateValue];
}

export default useToggle;
