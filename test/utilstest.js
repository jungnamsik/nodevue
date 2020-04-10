const util = require('util');
const utils = require('../utils') ;
const ogs2 = require('open-graph-scraper');

let ll = [];
let map = utils.makeMap("name", "jns1") ;
console.log('map=>',map.get("name"), map) ;



obj = {}
obj["name"] = "jns" ;
console.log(obj) ;
return ;

let str = 'NodeKey!!한글';

let e2 = utils.encryptSha2(str) ;
util.log('sha2=>', str, e2);




let e = utils.encrypt(str) ;

util.log("enc=>", str,  e) ;

let d = utils.decrypt(e) ;
util.log("dec=>", str,  d) ;

let url = 'https://www.ybtour.co.kr' ;

// utils.ogsinfo(url, (err, ret)=>{
//     util.log(err, ret) ;
// }) ;

// ogs2({url:url}, (err, ret) =>{
//     console.log(err, ret);
// });

