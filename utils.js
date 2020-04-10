const ogs = require('open-graph-scraper'),
      HashMap = require('hashmap'),
      Crypto = require('crypto-js'),
      SHA256 = ('crypto-js/sha256') ;

const Ekey = "noedvue!!";

module.exports = {

    makeMap(key, value) {
        const map = new HashMap();
        map.set(key, value);
        console.log('map>>', map.get(key)) ;
        return map ;
    },

    encryptSha2(data,key) {
        if (!data) return null;
        key = key || Ekey ;
        try {
            return Crypto.SHA256(data+key).toString() ;
        } catch (error) {
            console.error('encryptSha2 err=>', error) ;
        }
    },

    encrypt(data, key) {
        return Crypto.AES.encrypt(data, key|| Ekey).toString() ;
    },

    decrypt (data, key) {
        return Crypto.AES.decrypt(data, key|| Ekey).toString(Crypto.enc.Utf8);

    },

    ogsinfo(url, fn) {
        return ogs ({url:url}, (err, ret) => {
            fn(err, ret) ;
        }) ;
    }
} ;
