var Memcached = require("memcached");

module.exports = function(session) {
    var Store = session.Store;

    function MemcachedStore(options) {
        Store.call(this, options);
        this.debug = options.debug || false;

        if (options.prefix) {
            this.prefix = options.prefix;
        }

        this.client = new Memcached(options)
    }

    MemcachedStore.prototype.__proto__ = Store.prototype;
    MemcachedStore.prototype.prefix = '';

    MemcachedStore.prototype.getKey = function getKey(sid) {
        return this.prefix + sid;
    };
    MemcachedStore.prototype.get = function(sid, fn) {
        if (this.debug) {
            var startTime = new Date().getTime();
        }
        sid = this.getKey(sid);

        var that = this;
        this.client.get(sid, function(err, data) {
            try {
                if (!data) {
                    return fn();
                }
                fn(null, JSON.parse(data.toString()));
                if (that.debug) {
                    var totalTime = (new Date().getTime()) - startTime;
                    console.log("Session GET took " + totalTime + 'ms');
                }
            } catch (err) {
                if (that.debug) {
                    console.log("Session GET failed:");
                    console.log(err);
                }
                fn(err);
            }
        });
    };

    MemcachedStore.prototype.set = function(sid, sess, fn) {
        sid = this.getKey(sid);
        try {
            var maxAge = sess.cookie.maxAge
            var ttl = 'number' == typeof maxAge ? maxAge / 1000 | 0 : oneDay
            var sess = JSON.stringify(sess);

            this.client.set(sid, sess, function() {
                fn && fn.apply(this, arguments);
            }, ttl);
        } catch (err) {
            fn && fn(err);
        }
    };

    MemcachedStore.prototype.destroy = function(sid, fn) {
        sid = this.getKey(sid);
        // this.emit('destroy');
        // this.client.delete(sid, fn);
    };

    MemcachedStore.prototype.length = function(fn) {
        // memjs doesn't have this function
        return fn(null);
    };

    MemcachedStore.prototype.clear = function(fn) {
        // this.client.flush(fn);
    };

    return MemcachedStore;

}
