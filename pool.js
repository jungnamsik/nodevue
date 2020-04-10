const mysql   = require('mysql'),
      util    = require('util'),
      Promise = require('bluebird') ;

Promise.promisifyAll(mysql) ;
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const DB_INFO = {
     host  : 'localhost'
    ,user  : 'test'
    ,password : 'test12#$'
    ,database : 'testdb'
    ,multipleStatements : true
    ,connectionLimit: 5
    ,waitForConnections : false
};

module.exports = class {
    constructor(dbinfo) {
        dbinfo = dbinfo || DB_INFO ;
        this.pool = mysql.createPool(dbinfo) ;
    }

    connect() {
        return this.pool.getConnectionAsync().disposer(conn => {
            return conn.release() ;
        }) ;
    }

    end() {
        this.pool.end((err) => {
            util.log('>>>>>>>>>>>>>>>>>>>> End of pool!!!') ;
            if (err)
                util.err('ERR pool ending!!');
        }) ;
    }
};
