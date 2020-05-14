/*
    这个文件里存放一些全局性的东西
        1、常用的一些变量
        2、创建一个最基础的方块构造函数
        3、根据方块构造函数，创建各个元素对象
        4、存储蛇头与其它格子碰撞后的处理方式信息
 */
//游戏区域的大小
var td = 30;  //宽度，列数（单位为一个格子）
var tr = 30;  //高度，行数 

//每个方块的宽度
var squareWidth = 20;

//场景区域的初始位置
var positionX = 200;
var positionY = 100;

//蛇的移动时间间隔
var intervalTime = 300;

//定义一个最基础的方块构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
//由于单例对象的信息永远是第一次的。如果想让它变的话，就需要更新信息。这个方法就是用来更新单例对象的位置信息
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
};

var Ground = tool.single(Square); //整个游戏场景，它是一个单例对象
var Floor = tool.extends(Square); //地板
var Wall = tool.extends(Square); //围墙

var SnakeHead = tool.single(Square);  //蛇头，是一个单例对象
var SnakeBody = tool.extends(Square);  //蛇身
var Snake = tool.single();  //蛇
var Food = tool.single(Square);  //食物

var Game=tool.single(); //游戏


//给每一个方块身上打一个标签，用于处理跟蛇头碰撞后的方式
var collideType = {
    move: 'move',
    eat: 'eat',
    die: 'die',
}
