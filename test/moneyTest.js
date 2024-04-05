import formatCurrency from "../scripts/utils/money.js";

const testFormatCurrency = (value, exeption, msg) => {
  console.log("test suite: formatCurrency");
  console.log(msg);
  if (formatCurrency(value) === exeption) {
    console.log("✅ passed");
  } else {
    console.log("🌋 faild");
  }
};

testFormatCurrency(2050, "20.50", "convert cents to dolar");
testFormatCurrency(0, "0.00", "working with 0");
testFormatCurrency(2000.5, "20.01", "round up to the nearst cent");
testFormatCurrency(2000.3, "20.00", "round up to the nearst cent");
