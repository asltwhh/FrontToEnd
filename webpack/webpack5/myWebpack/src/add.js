import plus from "./plus";

function add(x, y) {
  return x + y + plus(x);
}

export default add;
