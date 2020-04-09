const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  password : 'test12#$',
  database : 'testdb'
});
 
connection.connect();
 
connection.query('select * from tno where no >= ? and cno >= ?', [1, '01'], function (error, rows, fields) {
  if (error) throw error;

  console.log('rows=>', rows);
  console.log('fields=>', fields);

  for (var i=0;i<rows.length;i++)
  {
      console.log('The First User is: ', rows[i]);
  }

  rows.forEach(element => {
      console.log("element=>",element["cno"]);
  });

  fields.forEach(obj=>{
      console.log("obj=>", obj["name"]) ;
  });


//   fields.entries()


});
 
connection.end();
