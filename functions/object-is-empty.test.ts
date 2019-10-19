// @COMMENT: (Pure) functions are great candidates and all of them should be tested.

import { objectIsEmpty } from "./object-is-empty";

describe('objectIsEmpty', () => {
  it('should return true if object is empty', () => {
    expect(objectIsEmpty({})).toBe(true);
  });

  it('should return false if object is no empty', () => {
    expect(objectIsEmpty({ a: 1 })).toBe(false);
  });
});
