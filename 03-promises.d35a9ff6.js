!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequire7bc7=o);var i=o("h6c0i"),r={btnCreatePromices:document.querySelector("form>button"),delay:document.querySelector('input[name="delay"]'),step:document.querySelector('input[name="step"]'),amount:document.querySelector('input[name="amount"]')};function a(e,n,t){t>0&&(a(e,n,t-1),function(e,n){return new Promise((function(t,o){setTimeout((function(){Math.random()>.3?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}(t,e+n*(t-1)).then((function(e){var n=e.position,t=e.delay;i.Notify.success("Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;i.Notify.failure("Rejected promise ".concat(n," in ").concat(t,"ms"))})))}i.Notify.init({fontSize:"13px",clickToClose:!0}),r.btnCreatePromices.addEventListener("click",(function(e){e.preventDefault();var n=Number(r.step.value),t=Number(r.delay.value),o=Number(r.amount.value);if(n<0||t<0||o<1)return void i.Notify.warning("Please enter valid value");a(t,n,o),r.btnCreatePromices.disabled=!0,setTimeout((function(){r.btnCreatePromices.disabled=!1}),t+n*(o-1))}))}();
//# sourceMappingURL=03-promises.d35a9ff6.js.map