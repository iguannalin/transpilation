window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  const container = document.getElementById("container");
  let alphabet;

  function onHover(e) {
    const found = Object.values(alphabet).indexOf(e.target.innerHTML);
    if (found) {
      console.log({found});
      e.target.innerHTML = Object.keys(alphabet)[found];
    }
    e.target.removeEventListener("touchstart", onHover);
    e.target.removeEventListener("mouseover", onHover);
  }

  function display(ww) {
    ww.split("").forEach((ch) => {
      ch = ch.toLowerCase();
      if (ch == "*") container.innerHTML += "&nbsp;";
      else if (!alphabet[ch]) container.innerHTML += ch;
      else {
        const text = document.createElement("span");
        text.innerHTML = alphabet[ch];
        text.addEventListener("touchstart", onHover);
        text.addEventListener("mouseover", onHover);
        container.appendChild(text);
      }
    })
  }

  fetch("words.txt").then((r) => r.text()).then((words) => {
    fetch("alphabet.json").then((a) => a.json()).then((aa) => {
      alphabet = aa;
      display(words.replace(" ", "*"));
    })
  });
});