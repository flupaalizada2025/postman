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
  splitterElem = $(e.target);
  splitterParent = splitterElem.parent();
  splitterPrev = splitterElem.prev();
  splitterNext = splitterElem.next();
  collapsePrevCallback = fnMap[splitterElem.data("collapseprevcallback")];
  expandPrevCallback = fnMap[splitterElem.data("expandnextcallback")];
  collapseNextCallback = fnMap[splitterElem.data("collapseprevcallback")];
  expandNextCallback = fnMap[splitterElem.data("expandnextcallback")];
}

function onMouseMove(e) {
  if (isDraggingSplitter) {
    const parentWidth = splitterParent.width();
    const parentOffset = splitterParent.offset();
    const parentX = parentOffset.left;
    const parentY = parentOffset.top;

    if (splitterElem.data("direction") === "vertical") {
      const prevWidth = e.clientX - parentX;
      const nextWidth = parentX + parentWidth - e.clientX;
      const prevMin = splitterElem.data("prevmin");
      const nextMin = splitterElem.data("nextmin");

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
        prevWidth === prevMin
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
        nextWidth === nextMin
      ) {
        expandNextCallback();
        isNextCollapsed = false;
        console.log("expand prev");
      } else if (prevMin <= prevWidth && nextMin <= nextWidth) {
        splitterPrev.css("width", prevWidth);
        splitterNext.css("width", nextWidth);
        console.log("Default");
      }
    } else if (splitterElem.data("direction") === "horizontal") {
      // Handle horizontal direction logic
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

$(document).ready(() => {
  $(".splitter").on("mousedown", onMouseDown);
});

$(document).on("mousemove", onMouseMove);
$(document).on("mouseup", onMouseUp);
