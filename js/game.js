var game = new Game();
game.timer = null;
game.score = 0;

game.init = function () {
    ground.init();
    snake.init();

    crateFood();

    document.onkeydown = function (e) {
        if (e.which == 37 && snake.direction != directionNum.right) {   //蛇往右走的时候不能按左键
            snake.direction = directionNum.left;
        } else if (e.which == 38 && snake.direction != directionNum.bottom) {   //往下走的时候不能按上键
            snake.direction = directionNum.top;
        } else if (e.which == 39 && snake.direction != directionNum.left) {      //往左走的时候不能按右键
            snake.direction = directionNum.right;
        } else if (e.which == 40 && snake.direction != directionNum.top) {   //往上走的时候不能按下键
            snake.direction = directionNum.bottom;
        }
    };


    var btn = document.getElementById('btn');
    btn.onclick = function () {
        game.start();
    }
}

game.start = function () {
    this.timer = setInterval(function () {
        snake.getCollideSquare();
    }, intervalTime);
}
game.over = function () {
    clearInterval(this.timer);
    alert(this.score);
}

function crateFood() {
    var x = null;
    var y = null;

    var flag = true;  //循环跳出的条件

    while (flag) {
        /*
            排除食物不能在墙上的循环
                1、坐标不能在围墙上，x不能等于0，也不能等于td-1。只能为1-28。y也一样 
                2、x-y的随机数：Math.round(Math.random()*(y-x) + x)
                    Math.round(Math.random()*27 + 1)
                3、也就是要随机一个1~28之间的数字 
         */
        x = Math.round(Math.random() * (28 - 1) + 1);
        y = Math.round(Math.random() * (28 - 1) + 1);

        var ok = true;
        //排除食物不能出现在蛇身上的循环（从蛇头倒着循环到蛇尾）。第二个参数表示的意思为，如果节点存在，循环就会一直走
        for (var node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }

        if (ok) {   //如果ok为true，表示上面的for循环里的条件没有满足（坐标没在蛇身上）那这个情况排除了，就表示两种情况都排除了，while循环就不用走了
            flag = false;
        }
    }

    var food = SquareFactory.create('Food', x, y, 'red');
    ground.remove(food.x, food.y);
    ground.append(food);
}


game.init();