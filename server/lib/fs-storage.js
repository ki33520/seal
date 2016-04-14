'use strict';
var fs = require("fs"),
    path = require("path");

var FSStorage = function(options){
    options = options || {
        path:"storage/"
    }
    this.path = options.path
    try{
        fs.statSync(path.resolve(this.path))
    }catch(e){
        fs.mkdirSync(path.resolve(this.path))
    }
}

FSStorage.prototype.get = function(key){
    var file = path.resolve(this.path + key +".dat")
    if(this.isFileExist(file)){
        var ret = fs.readFileSync(file,"utf8")
        ret = JSON.parse(ret)
        if(Date.now() > ret.expire){
            // return null
        }
        return ret.ret
    }
    return null
}

FSStorage.prototype.set = function(key,ret,expire){
    var file = path.resolve(this.path + key +".dat")
    expire = expire || 10
    expire = Date.now() //seconds
    ret = JSON.stringify({
        ret:ret,expire:expire
    })
    fs.writeFileSync(file,ret)
}

FSStorage.prototype.isFileExist = function(file){
    var stat
    try{
        stat = fs.statSync(file)
    }catch(e){
        return false
    }
    return stat.isFile()
}

FSStorage.prototype.remove = function(key){
    var file = path.resolve(this.path + key +".dat")
    if(this.isFileExist(file)){
        return fs.unlinkSync(file);
    }
}

FSStorage.prototype.clean = function(){
    var files = fs.readdirSync(path.resolve(this.path))
    for(var i in files){
        var file = files[i]
        fs.unlinkSync(path.resolve(this.path+file));
    }
}

module.exports = FSStorage