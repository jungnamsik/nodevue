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

  
  fields.forEach(obj=>{
    console.log("obj=>", obj["name"]) ;
  });
  
  rows.forEach((element, idx) => {
      console.log("idx, element=>",idx, element, typeof(element));
      for (var i in element) {
        console.log("i,element[i]=>",i,element[i]) ;
      }
  });

  for (x in rows) {
    console.log("==>",x,rows[x]) ;
    for (y in rows[x]) {
      console.log("x,y,rows[x][y]=>",x,y, rows[x][y]);
    }
  }


//   fields.entries()


});

 
connection.end();
