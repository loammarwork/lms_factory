import React from "react";
import InputMask from "react-input-mask";

const InputTimeUntilMask = React.forwardRef((props, ref) => {
  let mask = "12:34-56:78";
  let formatChars = {
    1: "[0-2]",
    2: "[0-9]",
    3: "[0-5]",
    4: "[0-9]",
    5: "[0-2]",
    6: "[0-9]",
    7: "[0-5]",
    8: "[0-9]",
  };

  let beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;
    if (value?.startsWith("2")) formatChars["2"] = "[0-3]";
    else formatChars["2"] = "[0-9]";
    if (value[6] === "2") formatChars["6"] = "[0-3]";
    else formatChars["6"] = "[0-9]";
    return { value, selection: newState.selection };
  };
  return (
    <InputMask
      className="form-control"
      style={{ width: "100px", textAlign: "center" }}
      {...props}
      ref={ref}
      mask={mask}
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
    ></InputMask>
  );
});

export default InputTimeUntilMask;
