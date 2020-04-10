const express = require('express');
const app = express() ;

const testJson = require('./test/test.json');
const Pool = require('./pool') ;
const Mydb = require('./mydb') ;

const pool = new Pool();
      
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile );


app.get('/', (req, res) => {
    // res.send("Hello NodeJS!!");
    // res.json(testJson);
    res.render('index', {"name":"abcd"})
});

app.get("/dbtest/:no", (req, res)=>{
    let no = req.params.no;
    let mydb = new Mydb(pool);
    let sql = 'select no, cno from tno where no >=?' ;
    mydb.execute(conn => {
        conn.query( sql, [no], (err, ret) => {
                if (err) throw err ;
        
                for (x in ret)
                {
                    console.log("ret[x]=>",ret[x]) ;
                }
                res.json(ret);
            }
        );
    });

})


app.get("/test/:email", (req, res)=>{
    testJson.email = req.params.email;
    testJson.aa = req.query.aa;
    res.json(testJson)
})

 const server = app.listen(7000, function(){
    console.log("Express's started on port 7000");
});
