//1、创建一个管理者（构造函数）
function SquareFactory() {

}

//所有小方块的初始化方法
SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;

    /*
        x代表列，y代表行
         left=列(x)*宽度;
         top=行(y)*高度;
     */

    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';

    //给每个方块实例身上添加这条属性，它决定了每个方块的碰撞类型
    square.collide=action;
}

//2、包装创建方块的构造函数（流水线、子工厂）

//创建地板的流水线
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, collideType.move);

    return floor;
};

//创建围墙的流水线
SquareFactory.prototype.Wall = function (x, y, color) {
    var wall = new Wall(x, y, squareWidth, squareWidth);

    this.init(wall, color, collideType.die);

    return wall;
};

//创建蛇头的流水线
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);

    this.init(snakeHead, color, collideType.die);

    snakeHead.upDate(x, y); //更新单例对象的位置信息

    return snakeHead;
};

//创建蛇身的流水线
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);

    this.init(snakeBody, color, collideType.die);

    return snakeBody;
};

//创建食物的流水线
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);

    this.init(food, color, collideType.eat);

    food.upDate(x, y);  //更新单例对象的位置信息

    return food;
};


//3、对外提供创建接口
SquareFactory.create = function (type,x,y,color) {
    if(typeof SquareFactory.prototype[type]=='undefined'){
        throw 'no this type';
    }

    //继承
    SquareFactory.prototype[type].prototype=new SquareFactory();

    return new SquareFactory.prototype[type](x, y, color);
};

//var wall = SquareFactory.create('Wall', 1, 1, 'black');
