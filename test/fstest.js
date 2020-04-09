const fs = require('fs');
const util = require('util') ;

// console.log("aaa");
// util.log("aaaa", __dirname);  // log time  

filename = __dirname + '/test.json' ;
fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) return util.error(err);

    util.log("data>>", data);
});

util.log("------------------------");

const msgFile = __dirname + "/message.txt";
let data = "Hello Node : 한글 샾"
fs.writeFileSync(msgFile, data, (err)=>{
    if (err) throw err;
    util.log("file Saved~!!")
})


let dt = fs.readFileSync(msgFile, 'utf-8');
util.log("data2>>", dt);

util.log("===================================");

const msgFile3 = __dirname + "/message3.txt";
let data3 = "Hello Node 3 : 한글 샾 abc 3"
fs.writeFile(msgFile3, data3, (err)=>{
    if (err) throw err;
    util.log("file3 Saved~!!!!")

    let data3 = fs.readFileSync(msgFile3, 'utf-8');
    util.log("data2>>", data3);
})

console.log("=============[end]======================");
