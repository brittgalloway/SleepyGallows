// Jest mock for CSS/SCSS modules
// Returns a Proxy so any className lookup returns the key name itself,
// which makes data-testid and className assertions easier to debug.
module.exports = new Proxy(
  {},
  { get: (_, key) => (key === '__esModule' ? false : key) }
);