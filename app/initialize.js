/** @jsx createElement */
/**
 * Initialize module
 *
 * @author Darryl Cousins <darryljcousins@gmail.com>
 * @module app/initialize
 */
import "regenerator-runtime/runtime"; // regeneratorRuntime error
import { isElement, createElement, Fragment } from "@bikeshaving/crank/cjs";
import { renderer } from "@bikeshaving/crank/cjs/dom";

import CollapseWrapper from "./collapse-animator";

/**
 * A simple text button component
 *
 * @function TextButton
 * @param {object} props The property object
 * @param {string} props.text The label text
 * @returns {Element} DOM component
 * @example
 * <TextButton text="Click me" />
 */
async function* TextButton({ text }) {
  for await ({text} of this) {
    const button = yield (
      <button
        class="dim f6 dark-gray b--dark-blue ba br2 bg-blue b white pointer pa2"
        title={text}
        type="button"
      >
        {text}
      </button>
    );
  };
};

function TextParagraph() {
  return (
    <p class="lh-copy">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  );
};

const CollapseTextParagraph = CollapseWrapper(TextParagraph);

/**
 * Component to render crank example.
 *
 * @generator
 * @yields {Element} DOM component
 */
function* App() {
  /**
   * Holds the count of a stateful component
   *
   * @member {number} count
   */
  let count = 0;

  /**
   * Is our collapsable element collapsed
   *
   * @member {Boolean} collapsed
   */
  let collapsed = true;

  /**
   * A simple text button component
   *
   * @function handleClick
   * @param {object} ev The click event
   * @listens window.click
   */
  const handleClick = async (ev) => {
    if (ev.target.tagName === "BUTTON") {
      collapsed = !collapsed;
      count += 1;
      await this.refresh();
    }
  };

  this.addEventListener("click", handleClick);

  /**
   * Algorithm to determine text to display according to count
   *
   * @function figureCountText
   * @param {number} num The click count in this context
   * @returns {string} Text to display dependent on the count
   */
  const figureCountText = (num) => {
    let text;
    switch (num) {
      case 1:
        text = "once";
        break;
      case 2:
        text = "twice";
        break;
      case 3:
        text = "thrice";
        break;
      default:
        text = `${num} times`;
        break;
    }
    return text;
  };

  while (true) {
    yield (
      <section class="w-100 center">
        <p class="lh-copy b">
          Brunch, Express, Crank, and Tachyons
          <div class="tr ma2">
            <TextButton
              text={
                count === 0
                  ? "Click me"
                  : `I've been clicked ${figureCountText(count)}`
              }
            />
            <CollapseTextParagraph 
              collapsed={collapsed}
              id="identifyme"
            />
          </div>
        </p>
      </section>
    );
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderer.render(<App />, document.querySelector("#app"));
});
