function collapsePrev() {
  console.log("Prev Collapsed");
}
function expandPrev() {
  console.log("Prev Expanded");
}

const fnMap = {
  collapsePrev,
  expandPrev,
};

let isDraggingSplitter = false;
let splitterElem = null;
let splitterParent = null;
let splitterPrev = null;
let splitterNext = null;
let isPrevCollapsed = false;
let isNextCollapsed = false;
let collapsePrevCallback = null;
let expandPrevCallback = null;
let collapseNextCallback = null;
let expandNextCallback = null;

function onMouseDown(e) {
  isDraggingSplitter = true;
  splitterElem = e.target;
  splitterParent = e.target.parentElement;
  splitterPrev = e.target.previousElementSibling;
  splitterNext = e.target.nextElementSibling;
  collapsePrevCallback = fnMap[splitterElem.dataset.collapseprevcallback];
  expandPrevCallback = fnMap[splitterElem.dataset.expandnextcallback];
  collapseNextCallback = fnMap[splitterElem.dataset.collapseprevcallback];
  expandNextCallback = fnMap[splitterElem.dataset.expandnextcallback];
}

function onMouseMove(e) {
  if (isDraggingSplitter) {
    const { clientWidth: parentWidth } = splitterParent;
    const { left: parentX, top: parentY } =
      splitterParent.getBoundingClientRect();

    if (splitterElem.dataset.direction == "vertical") {
      const prevWidth = e.clientX - parentX;
      const nextWidth = parentX + parentWidth - e.clientX;
      const prevMin = splitterElem.dataset.prevmin;
      const nextMin = splitterElem.dataset.nextmin;

      console.clear();
      console.log(prevWidth, prevMin);
      console.log(nextWidth, nextMin);
      if (
        typeof collapsePrevCallback === "function" &&
        !isPrevCollapsed &&
        prevWidth < prevMin
      ) {
        collapsePrevCallback();
        isPrevCollapsed = true;
        console.log("collapse prev");
      } else if (
        typeof expandPrevCallback === "function" &&
        isPrevCollapsed &&
        prevWidth == prevMin
      ) {
        expandPrevCallback();
        isPrevCollapsed = false;
        console.log("expand prev");
      } else if (
        typeof collapseNextCallback === "function" &&
        !isNextCollapsed &&
        nextWidth < nextMin
      ) {
        collapseNextCallback();
        isNextCollapsed = true;
        console.log("collapse next");
      } else if (
        typeof expandNextCallback === "function" &&
        isNextCollapsed &&
        nextWidth == nextMin
      ) {
        expandNextCallback();
        isNextCollapsed = false;
        console.log("expand prev");
      } else if (prevMin <= prevWidth && nextMin <= nextWidth) {
        splitterPrev.style.width = `${prevWidth}px`;
        splitterNext.style.width = `${nextWidth}px`;
        console.log("Default");
      }
    } else if (splitterElem.dataset.direction == "horizontal") {
    } else {
      console.error("Missing property 'data-direction'!");
    }
  }
}
function onMouseUp(e) {
  isDraggingSplitter = false;
  splitterElem = null;
  splitterParent = null;
  splitterPrev = null;
  splitterNext = null;
  collapsePrevCallback = null;
  expandPrevCallback = null;
  collapseNextCallback = null;
  expandNextCallback = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const splitters = document.querySelectorAll(".splitter");
  for (const splitter of splitters) {
    splitter.addEventListener("mousedown", onMouseDown);
  }
});

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);
