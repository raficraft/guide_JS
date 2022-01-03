export const useState = (defaultVaue) => {
  let value = defaultVaue;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  return [getValue, setValue];
};
