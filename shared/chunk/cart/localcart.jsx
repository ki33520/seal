var localCart = {
    key:'_local_cart',
    getCart : function() {
        var cache = window.localStorage.getItem(this.key);
        var res = [];
        if(cache){
            res = JSON.parse(cache);
        }
        return res;
    },
    setCart : function(id,num) {
        var key = this.key;
        var cache = this.getCart(key);
        var _cache = [];
        cache.forEach(function(item,i){
            if(item.singleCode!==id){
                _cache.push(item);
            }
        });
        _cache.push({singleCode:id,buyed:num});
        cache = JSON.stringify(_cache)
        window.localStorage.setItem(key,cache);
    },
    format:function(){
        var cache = this.getCart();
        var ids = [];
        var nums = [];
        cache.forEach(function(item){
            ids.push(item.singleCode);
            nums.push(item.buyed);
        });
        if(ids.length && nums.length){
            return {
                ids:ids.join(','),
                nums:nums.join(',')
            }
        }
        return {ids:null,nums:null}
    },
    clearCart:function(){
        window.localStorage.removeItem(this.key);
    },
    deleteGoods:function(id){
        var cache = this.getCart();
        cache.forEach(function(item,i){
            if(item.singleCode==id){
                cache.splice(i,1);
            }
        });
        cache = JSON.stringify(cache)
        window.localStorage.setItem(this.key,cache);
    },
    updateCart:function(id,num){
        var cache = this.getCart();
        cache.forEach(function(item){
            if(item.singleCode==id){
                item.buyed = num;
            }
        });
        cache = JSON.stringify(cache)
        window.localStorage.setItem(this.key,cache);
    }
}

export default localCart;