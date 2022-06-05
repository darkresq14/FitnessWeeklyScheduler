export function capitalizeString(str) {
  const stringArray = str.split("");
  stringArray[0] = stringArray[0].toUpperCase();
  return stringArray.join("");
}
