import mermaid from "mermaid";
import flowchart from "flowchart.js";
import plantuml from "plantuml-encoder";
import abcjs from "abcjs";
import abcjsMidi from "abcjs/midi";
import "abcjs/abcjs-midi.css";
import "font-awesome/css/font-awesome.min.css";

mermaid.initialize({ startOnLoad: false });

const mermaid = el => {
  const tDom = el.firstChild.firstChild;
  try {
    tDom.removeAttribute("data-processed");
    mermaid.init(undefined, tDom);
  } catch (error) {
    tDom.innerHTML = `${error}`;
  }
};

const flowchart = el => {
  const tDom = el.firstChild.firstChild;
  try {
    const chart = flowchart.parse(tDom.innerHTML.replace(/&gt;/g, ">"));
    tDom.innerHTML = "";
    chart.drawSVG(tDom, require("./flowchart.config"));
  } catch (error) {
    tDom.innerHTML = `${error}`;
  }
};

const plantuml = el => {
  const tDom = el.firstChild.firstChild;
  try {
    const encoded = plantumlEncoder.encode(
      tDom.innerHTML.replace(/&gt;/g, ">")
    );
    tDom = document
      .createElement("object")
      .setAttribute("data", "http://www.plantuml.com/plantuml/img/" + encoded);
  } catch (error) {
    tDom.innerHTML = `${error}`;
  }
};

const abc = el => {
  const tDom = el.firstChild.firstChild;
  const script = tDom.innerHTML;
  try {
    abcjs.renderAbc(tDom, script, {
      responsive: "resize"
    });

    let midiDom = Array.from(el.firstChild.children).filter(
      innerEl => innerEl.className === "abcjs-midi-container"
    );

    if (midiDom.length > 0) {
      midiDom = midiDom[0];
    } else {
      midiDom = document.createElement("div");
      midiDom.setAttribute("class", "abcjs-midi-container");
      el.firstChild.appendChild(midiDom);
    }

    abcjsMidi.renderMidi(midiDom, script, {
      generateDownload: true
    });
  } catch (error) {
    tDom.innerHTML = `${error}`;
  }
};

// Update

const update = base => {
  for (const el of Array.from(base.firstChild.children)) {
    const r = el.firstChild;

    if (!(el.tagName !== "PRE" && r.firstChild.firstChild.tagName !== "svg")) {
      return;
    }

    switch (r.className) {
      // Update Mermaid
      case "language-mermaid":
        mermaid(el);
        break;
      // Update flowchart
      case "language-flow":
        flowchart(el);
        break;
      // Update plantuml
      case "language-plantuml":
        plantuml(el);
        break;
      // Update abc
      case "language-abc":
        abc(el);
        break;
      default:
        break;
    }
  }
};

// preUpdate

const preRender = (markdownIt, code, lang) => {
  switch (lang) {
    // Update Mermaid
    case "mermaid":
      return `<div class="mermaid">${markdownIt.utils.escapeHtml(code)}</div>`;
    // Update flowchart
    case "flow":
      return `<div class="flow-chart">${markdownIt.utils
        .escapeHtml(code)
        .replace(/&gt;/g, ">")}</div>`;
    // Update plantuml
    case "plantuml":
      return `<div class="plantuml">${markdownIt.utils.escapeHtml(code)}</div>`;
    // Update abc
    case "abc":
      return `<div class="abc">${markdownIt.utils.escapeHtml(code)}</div>`;
    default:
      break;
  }
};

export default {
  preRender,
  update
};
