
const Mydb = require('./mydb') ;

module.exports = function(app, pool) {

    app.get('/', (req, res) => {
        // res.send("Hello NodeJS!!");
        // res.json(testJson);
        res.render('index', {"name":"abcd"})
    });


    


    app.post("/apis/adminkey", (req, res)=>{
        let key = req.body.key ;
        if (key === '1212'|| key === "surveykey!!") {
            res.status(200).json({});
        } else {
            res.status(403).json({});
        }
    }) ;

    app.get("/apis/surveys", (req, res)=>{
        let mydb = new Mydb(pool);
        let sql = 'SELECT id, title, state FROM testdb.Survey limit ?' ;
        let limit_num = 100
        mydb.execute(conn => {
            conn.query( sql, [limit_num], (err, ret) => {
                    if (err) throw err ;
                    res.json(ret);
                }
            );
        });
    }) ;

    app.get("/apis/surveys/:id", (req, res)=>{
        let id = req.params.id ;
        let mydb = new Mydb(pool);
        let sql = 'SELECT id, title, state FROM testdb.Survey where id = ?' ;
        console.log("sql>>",sql);
        mydb.execute(conn => {
            conn.query( sql, [id], (err, ret) => {
                    if (err) throw err ;
                    res.json(ret[0]);
                }
            );
        });
    }) ;


    app.put("/apis/surveys/:id", (req, res)=>{
        let id = req.params.id ;
        let title = req.body.title;
        let state = req.body.state ;
        let mydb = new Mydb(pool);
        let sql = 'update Survey set  title = ?, state = ?  where id = ?' ;
        mydb.executeTx(conn => {
            conn.query( sql, [title, state, id], (err, ret) => {
                    if (err) throw err ;
                    res.json(ret);
                }
            );
        });
    }) ;


    app.post("/apis/surveys/:id", (req, res)=>{
        let title = req.body.title;
        let state = 0 ;
        let mydb = new Mydb(pool);
        let sql = 'insert into Survey ( title, state) values (?,?)' ;
        mydb.executeTx(conn => {
            conn.query( sql, [title, state], (err, ret) => {
                    if (err) throw err ;
                    res.json(ret);
                }
            );
        });
    }) ;

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