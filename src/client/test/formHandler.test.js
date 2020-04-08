import { handleSubmit, postData, uiUpdate } from '../js/formHandler';


describe("Test: the function 'handleSubmit()'" , () => {
    test('It should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });

    test('It should be a function', () => {
      expect(typeof handleSubmit).toBe("function");
    });
});



describe("Test: the function 'postData()'" , () => {
  test('It should be defined', () => {
    expect(postData).toBeDefined();
  });

  test('It should be a function', () => {
    expect(typeof postData).toBe("function");
  });
});

describe("Test: the function 'uiUpdate()'" , () => {
  test('It should be defined', () => {
    expect(uiUpdate).toBeDefined();
  });

  test('It should be a function', () => {
    expect(typeof uiUpdate).toBe("function");
  });
});
