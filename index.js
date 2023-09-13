window.addEventListener("load", () => {
  const container = document.getElementById("container");
  let alphabet;

  function onHover(e) {
    e.target.innerHTML = alphabet[e.target.innerText]
    e.target.removeEventListener("touchstart", onHover);
    e.target.removeEventListener("mouseover", onHover);
  }

  function displayChar(ch, canHover = false) {
    if (!ch) return;
    const text = document.createElement("span");
    text.innerHTML = ch;
    if (canHover) {
      text.addEventListener("touchstart", onHover);
      text.addEventListener("mouseover", onHover);
    }
    container.appendChild(text);
  }

  function display(ww) {
    ww.split("").forEach((ch) => {
      ch = ch.toLowerCase();
      if (ch == "*") displayChar("&nbsp;&nbsp;");
      else if (ch == "@") displayChar("<br>");
      else if (!alphabet[ch]) displayChar(ch);
      else displayChar(alphabet[ch], true);
    })
  }

  fetch("words.txt").then((r) => r.text()).then((words) => {
    fetch("alphabet.json").then((a) => a.json()).then((aa) => {
      alphabet = aa;
      display(words.replace(" ", "*").replace("\n", "@"));
    })
  });
});