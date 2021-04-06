var express = require("express");
var fileService = require("fs");
var app = express();
let port = 8082;

var myObject = {};
myObject.Data = {};
myObject.filename = "testdata.json";
myObject.getData = function () {
  this.Data = {
    stocksymbol: "IBM",
  };
};
myObject.writeToDisk = function () {
  let dataAsString = JSON.stringify(this.Data, null, 2);
  fileService.writeFileSync(this.filename, dataAsString);
};
myObject.readFromDisk = function () {
  let rawdata = fileService.readFileSync(this.filename);
  this.Data = JSON.parse(rawdata);
};


//myObject.getData();
//myObject.writeToDisk();
//myObject.readFromDisk();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/stocks", (req, res) => {
  res.send(JSON.stringify(myObject.Data, null, 2));
});

app.get("/dailycovid", (req, res) => {
 let stringData =    fileService.readFile(__dirname + "/data/daily.json", 'utf8', function(err, data) {
        if (err) throw err;
        //console.log(data);
        // res.send(fileService.readFileSync());
        res.send( data);
      //  return data;
    });
 
});

app.get("/covid", (req, res) => {
  getUrl("https://api.covidtracking.com/v1/us/current.json")
    .then((result) => {
      res.send(result);
    })
    .catch(err);
  //  res.send(JSON.stringify(myObject.Data,null, 2))
});
//https://petetasker.com/using-async-await-jquerys-ajax
//https://api.covidtracking.com/v1/us/current.json
async function getUrl(ajaxurl) {
  let result;

  try {
    result = await $.ajax({
      url: ajaxurl,
      type: "GET",
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}
console.log(__dirname);
// app.use(express.static('pages'))
app.use("/pages", express.static(__dirname + "/pages"));
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/data", express.static(__dirname + "/data"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
