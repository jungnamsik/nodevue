
const Mydb = require('./mydb') ;


module.exports = function(app, pool) {
    app.get('/', (req, res) => {
        // res.send("Hello NodeJS!!");
        // res.json(testJson);
        res.render('index', {"name":"abcd"})
    });

    app.get("/apis/:no", (req, res)=>{
        let no = req.params.no;
        let mydb = new Mydb(pool);
        let sql = 'select no, cno from tno where no >=?' ;
        mydb.execute(conn => {
            conn.query( sql, [no], (err, ret) => {
                    if (err) throw err ;
                    res.json(ret);
                    let info = "";
                    // for (x in req)
                    // {
                    //     info += x + ": ["+req[x]+"]" ;
                    // }
                    console.log('info >> ',req.url, req.params);
                }
            );
        });

    }) ;


    app.put("/apis/:no", (req, res)=>{
        // let no = req.params.no;
        let no = req.body.no
        let cno = req.body.cno ;
        let param = [no, cno] ;

        let mydb = new Mydb(pool);
        let sql = 'update tno set cno = ? where no = ?' ;
        mydb.executeTx(conn => {
            conn.query( sql, param, (err, ret) => {
                    if (err) {
                        conn.rollback();
                        throw err ;
                    } 

                    res.json(ret);
                    conn.commit();
                    let info = "";
                    // for (x in req)
                    // {
                    //     info += x + ": ["+req[x]+"]" ;
                    // }
                    console.log('info >> ',req.method, req.url, param );
                }
            );
        });

    }) ;


    app.get("/dbtest/:no", (req, res)=>{
        let no = req.params.no;
        let mydb = new Mydb(pool);
        let sql = 'select no, cno from tno where no >=?' ;
        mydb.execute(conn => {
            conn.query( sql, [no], (err, ret) => {
                    if (err) throw err ;
            
                    for (x in ret)
                    {
                        // console.log("ret[x]=>",ret[x]) ;
                    }
                    res.json(ret);
                }
            );
        });

    }) ;

    app.get("/test/:email", (req, res)=>{
        testJson.email = req.params.email;
        testJson.aa = req.query.aa;
        res.json(testJson)
    });

} ;