'use strict';
var fs = require("fs"),
    path = require("path");

var _ = require("lodash");
var moment = require("moment");

var FSStorage = function(options){
    options = options || {
        path:"storage/",
        serialize:true,
        ext:".dat",
        expire:60000
    }
    this.options = options
    this.path = options.path
    try{
        fs.statSync(path.resolve(this.path))
    }catch(e){
        fs.mkdirSync(path.resolve(this.path))
    }
}

FSStorage.prototype.get = function(key){
    var file = path.resolve(this.path + key +this.options.ext)
    if(this.isFileExist(file)){
        var ret = fs.readFileSync(file,"utf8")
        if(this.options.serialize){
            ret = JSON.parse(ret)
            if(Date.now() > ret.expire){
                // this.remove(key)
                return null
            }
            return _.unescape(ret.ret)
        }else{
            var stat = fs.statSync(file)
            var mtime = new Date(stat.mtime)
            // console.log(moment(mtime).format("YYYY-MM-DD HH:mm:ss"))
            if((Date.now() - mtime.getTime()) > this.options.expire){
                // console.log("expire")
                // this.remove(key)
                return null
            }
            return ret
        }
    }
    return null
}

FSStorage.prototype.set = function(key,ret,expire){
    var file = path.resolve(this.path + key + this.options.ext)
    if(this.options.serialize){
        expire = expire || this.options.expire
        expire = Date.now() + expire
        ret = _.escape(ret)
        ret = JSON.stringify({
            ret:ret,expire:expire
        })
    }
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
    var file = path.resolve(this.path + key + this.options.ext)
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