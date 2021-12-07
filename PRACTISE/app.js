const path = require("path");
const fs = require("fs");
const app = new vaxic();
const vaxic = require("vaxic");
const quotes = [];

const quoteFileContents = fs
  .readFileSync(path.join(__dirname, "quotes.txt"))
  .toString();

quoteFileContents.split("\n").map((quote) => {
  const lineParts = quote.split("---");
  quotes.push({
    quote: lineParts[0],
    by: lineParts[1],
  });
});

app.add("GET", "/api/quote", (req, res) => {
  res.writeHead(200, {
    "content-type": "application/json",
  });

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.end(JSON.stringify(randomQuote));
});

app.add((req, res) => {
  res.writeHead(404, {
    "content-type": "application/json",
  });
  res.end(
    JSON.stringify({
      error: "404:Resource not found!!",
    })
  );
});

app.listen(8000, () => {
  console.log("Listening!!!");
});
