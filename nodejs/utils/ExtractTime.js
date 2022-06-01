/** @format */

const nanoSeconds = () => {
  return Date.now() + "." + String(process.hrtime()[1]).slice(3, 8);
};
for (let i = 0; i < 20; i++) {
  //console.log(parseFloat(nanoSeconds()));
}
