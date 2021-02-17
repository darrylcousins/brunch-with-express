/** @jsx createElement */
/**
 * Initialize module
 *
 * @author Darryl Cousins <darryljcousins@gmail.com>
 * @module app/initialize
 */
import "regenerator-runtime/runtime"; // regeneratorRuntime error
import { createElement, Fragment } from "@bikeshaving/crank/cjs";
import { renderer } from "@bikeshaving/crank/cjs/dom";

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
const TextButton = ({ text }) => (
  <button
    class="f6 dark-gray b--dark-blue ba br2 bg-blue b white pointer pa2 dim"
    title={text}
    type="button"
  >
    {text}
  </button>
);

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
   * A simple text button component
   *
   * @function handleClick
   * @param {object} ev The click event
   * @listens window.click
   */
  const handleClick = (ev) => {
    if (ev.target.tagName === "BUTTON") {
      count += 1;
      this.refresh();
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
      <section class="w-80 center">
        <p class="lh-copy">
          Brunch, Express, Crank, and Tachyons
          <div class="tr ma2">
            <TextButton
              text={
                count === 0
                  ? "Click me"
                  : `I've been clicked ${figureCountText(count)}`
              }
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
