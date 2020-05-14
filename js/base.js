var tool = {
    //继承
    inherit: function (target, origin) {    //target:目标对象 origin：源对象
        var F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },

    //扩展
    extends: function (origin) {
        var target = function () {
            origin.apply(this, arguments);
        };
        this.inherit(target, origin);
        return target;
    },

    //单例
    single: function (origin) {
        var target=(function(){
            var instance;

            return function(){
                if(typeof instance == 'object'){
                    return instance;
                }

                origin && origin.apply(this, arguments);
                instance=this;
            }
        })();

        origin && this.inherit(target, origin);
        return target;
    }
};

/* function Square(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
Square.prototype.collide = function () {
    console.log('collide');
}; */


/* 
function Food(){

}

tool.inherit(Food,Square);
var f=new Food();
f.collide(); */

/* var Food = tool.extends(Square);
var f = new Food(10, 20, 200, 100);
f.collide();
console.log(f.width); */

/* var SnakeHead=tool.single(Square);
var s1=new SnakeHead(10,20,100,200);
var s2=new SnakeHead(10,20,300,400);
console.log(s1===s2);
console.log(s2); */
