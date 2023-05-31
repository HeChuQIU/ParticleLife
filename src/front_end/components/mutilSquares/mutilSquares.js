const mq = document.getElementById("mutilSquares");
const change = document.getElementById("change");
const gridColumnStr = "grid-template-columns:";
const gridRowStr = "grid-template-rows:";
const colorHex = "0123456789ABCDEF";

mq.addEventListener("click", (event) => {
  const el = event.target;
  console.log(el);
});

function randomColor(count) {
  const ans = [];
  for (let k = 0; k < count; k++) {
    let hexStr = "#";
    for (let i = 0; i < 6; i++) {
      hexStr += colorHex[Math.floor(Math.random() * colorHex.length)];
    }
    ans.push(hexStr);
  }
  return ans;
}

function setSquares(count, colors) {
  if (count <= 0) {
    throw "count error";
    return;
  }
  totalCount = count + 1;
  const size = totalCount * totalCount;
  const nodes = mq.childNodes;

  if (size !== nodes.length) {
    let cssStr1 = gridColumnStr;
    for (let i = 0; i < totalCount; i++) {
      cssStr1 += "1fr ";
    }
    cssStr1 += ";";

    let cssStr2 = gridRowStr;
    for (let i = 0; i < totalCount; i++) {
      cssStr2 += "1fr ";
    }
    cssStr2 += ";";
    mq.setAttribute("style", cssStr1 + cssStr2);
    mq.innerHTML = "";
  }

  if (nodes.length === 0) {
    const dcf = document.createDocumentFragment();
    const styleStr = randomColor(size);
    for (let i = 0; i < size; i++) {
      const seq = document.createElement("div");
      seq.setAttribute("style", "background-color: " + styleStr[i] + ";");
      dcf.appendChild(seq);
    }
    mq.appendChild(dcf);
  } else {
    const styleStr = randomColor(nodes.length);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("style", "background-color: " + styleStr[i] + ";");
    }
  }
}

function setHeader(count) {
  const totalCount = count + 1;
  const nodes = mq.childNodes;
  nodes[0].setAttribute("style", "");

  const loop = Math.floor(count / 3);
  const per = Math.floor(255 / loop);
  const flags = [
    [-per, per, 0],
    [0, -per, per],
    [per, 0, -per],
  ];
  let r = 255;
  let g = 0;
  let b = 0;
  let flagIndex = 0;
  let flag = flags[flagIndex];
  let loopRun = loop;

  for (let i = 1; i < totalCount; i++) {
    r = Math.floor((r / Math.sqrt(r * r + g * g + b * b)) * 255);
    g = Math.floor((g / Math.sqrt(r * r + g * g + b * b)) * 255);
    b = Math.floor((b / Math.sqrt(r * r + g * g + b * b)) * 255);
    let styleStr = "rgb(" + r + "," + g + "," + b + ")";
    nodes[i].setAttribute(
      "style",
      "background-color: " + styleStr + ";border-radius: 50%;"
    );
    r += flag[0];
    g += flag[1];
    b += flag[2];
    loopRun -= 1;
    if (loopRun === 0 && flagIndex < 2) {
      loopRun = loop;
      flagIndex += 1;
      flag = flags[flagIndex];
    }
  }

  r = 255;
  g = 0;
  b = 0;
  flagIndex = 0;
  flag = flags[flagIndex];
  loopRun = loop;
  for (let i = totalCount; i < nodes.length; i += totalCount) {
    r = Math.floor((r / Math.sqrt(r * r + g * g + b * b)) * 255);
    g = Math.floor((g / Math.sqrt(r * r + g * g + b * b)) * 255);
    b = Math.floor((b / Math.sqrt(r * r + g * g + b * b)) * 255);
    let styleStr = "rgb(" + r + "," + g + "," + b + ")";
    nodes[i].setAttribute(
      "style",
      "background-color: " + styleStr + ";border-radius: 50%;"
    );
    r += flag[0];
    g += flag[1];
    b += flag[2];
    loopRun -= 1;
    if (loopRun === 0 && flagIndex < 2) {
      loopRun = loop;
      flagIndex += 1;
      flag = flags[flagIndex];
    }
  }
}

function run(count) {
  setSquares(count);
  setHeader(count);
}

run(6);
