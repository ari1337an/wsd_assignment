import { add } from "@/helper/message";

describe("Basic Unit Test", () => {
  it("should add two numbers correctly", () => {
    let result: number = add(9, 1);
    expect(result).toEqual(10);
  });
});
