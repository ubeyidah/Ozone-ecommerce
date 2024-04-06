import formatCurrency from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("convert cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("working with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("round up to the nearst cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
    expect(formatCurrency(2000.1)).toEqual("20.00");
  });
  it("working with negative cent", () => {
    expect(formatCurrency(-2090)).toEqual("-20.90");
  });
});
