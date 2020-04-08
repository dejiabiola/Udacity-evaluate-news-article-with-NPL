import { validateUrl } from "../js/urlValidator";


describe("Test: the function 'validateUrl()'" , () => {
  test('It should be defined', () => {
    expect(validateUrl).toBeDefined();
  });

  test('It should be a function', () => {
    expect(typeof validateUrl).toBe("function");
  });

  test('It should be return true if valid URL is passed into it', () => {
    expect(validateUrl("https://www.google.com")).toBeTruthy();
  });

  test('It should be return false if invalid URL is passed into it', () => {
    expect(validateUrl("https://ww.#google.com")).toBeFalsy();
  });
});