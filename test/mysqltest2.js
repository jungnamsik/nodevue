const util    = require('util'),
      Promise = require('bluebird') ;

const Pool = require('../pool');

const sql1 = 'update tno set cno=? where no = ?' ;
const sql2 = 'update tno set cno=? where no = ?' ;
const pool = new Pool() ;

executeTx(conn => {
    
    Promise.all([
        
        conn.queryAsync(sql1, ['aaa', 1]),
        conn.queryAsync(sql2, ['bbb', 2])
    
    ]).then( r => {
        util.log ('r=>', r)
        // for (x in r)
        for (var i=0;i < r.length; i++)
        {
            // util.log('typeof[x]=>',x,typeof(x));
            util.log(`sql${i+1}=`, r[i].affectedRows) ;
        }
        
        util.log("End of Then!!!!!!!!!!!!!!!!!!!");
        conn.commit();
        pool.end();
    }).catch( err => {
        util.log("EERRRRRRRRRRRR", err.sqlMessage);
        // util.log("EERRRRRRRRRRRR", err["sqlMessage"]);
        conn.rollback();
        pool.end();
    });

});

// make function ~!!
// function executeTx (fn) {
//     Promise.using( pool.connect(), conn => {
//         conn.beginTransaction (txerr => {
//             fn(conn) ;
//         }) ;
//     });
// }




// Promise.using( pool.connect(), conn => {
//     conn.beginTransaction (txerr => {
//         Promise.all([
    
//             conn.queryAsync(sql1, ['aa', 1]),
//             conn.queryAsync(sql2, ['bb', 2])
    
//         ]).then( r => {
//             util.log ('r=>', r)
//             // for (x in r)
//             for (var i=0;i < r.length; i++)
//             {
//                 // util.log('typeof[x]=>',x,typeof(x));
//                 util.log(`sql${i+1}=`, r[i].affectedRows) ;
//             }
            
//             util.log("End of Then!!!!!!!!!!!!!!!!!!!");
//             conn.commit();
//             pool.end();
//         }).catch( err => {
//             util.log("EERRRRRRRRRRRR", err.sqlMessage);
//             // util.log("EERRRRRRRRRRRR", err["sqlMessage"]);
//             conn.rollback();
//             pool.end();
//         });

//     }) ;
// });



// Promise.using( pool.connect(), conn => {
//     Promise.all([

//         conn.queryAsync(sql1, ['aaa', 1]),
//         conn.queryAsync(sql2, ['b', 2])

//     ]).then( r => {
//         util.log("End of Then!!!!!!!!!!!!!!!!!!!");
//         util.log("sql1=", r[0].affectedRows);
//         util.log("sql2=", r[1].affectedRows);
//         pool.end();

//     }).catch( err => {
//         util.log("EERRRRRRRRRRRR");
//         pool.end();
//     });
// });



// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1, ['aaeaa', 1])
//         .then(console.log)
//         .catch (err => {
//             util.log('Error>>', err) ;
//         });
//     pool.end();
// });



// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1, ['a', 1], (err, ret)=>{
//         util.log('sql1=>', ret.affectedRows );
//     }) ;

//     pool.end();
// });

