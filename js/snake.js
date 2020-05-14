var snake = new Snake();
snake.head = null;    //蛇头，用来存储蛇头的那个方块
snake.tail = null;    //蛇尾，用来存储蛇尾的那个方块

//处理蛇走的方向（方向信息）
var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    },
}

snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    //把蛇头与蛇尾的信息记录一下，存到变量上
    snake.head = snakeHead;
    snake.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    //链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    //这个属性里存储蛇要走的方向，值为上面存的方向信息的某一个。一上来默认往右走（下面以及按下方向键的时候要用）
    this.direction = directionNum.right;  //
}

//获取蛇头走到的下一个方块。要根据方向获取到下一个方块（碰撞到的那个方块）
snake.getCollideSquare = function () {
    var nextSquare = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(nextSquare);

    this.collideMethod[nextSquare.collide](nextSquare);
};

snake.collideMethod = {
    move: function (square,boolean) {
        //在旧蛇头的位置创建一个新身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

        //更新链表的关系（注意：这里没有body1,body2,只有head，所以关系只能从head身上找）
        newBody.next=snake.head.next;
        newBody.last=null;
        newBody.next.last=newBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        //在碰撞方块的位置创建一个新蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');
        
        //更新链表的关系
		newHead.next = newBody;	//蛇头左边是新身体
		newHead.last = null;	//蛇头右边啥也没有
		newBody.last = newHead;	//新身体的右边是蛇头

        ground.remove(square.x, square.y);
        ground.append(newHead);

        snake.head=newHead;

        /*
			处理最后一节身体
				1、最后一节身体要不要删除，删除就是走。不删除就是吃。我用一个变量来决定它
				2、如果这个变量没有传，就表示现在要走，走的话就要删除了，删完了还需要添加一个地板
		 */
        if(!boolean){   //这个条件成立说明要继续走（需要删除最后一节身体）
            ground.remove(snake.tail.x,snake.tail.y);

            var newFloor=SquareFactory.create('Floor', snake.tail.x,snake.tail.y, 'grey');
            ground.append(newFloor);

            snake.tail=snake.tail.last; //把蛇尾更新成它右边的方块
        }
    },
    eat: function (square) {
        this.move(square,true); //传第二个参数，表示要吃，就不会删除最后一节身体了
        crateFood();
        game.score++;
    },
    die: function () {
        game.over();
    }
}


/* snake.init();

snake.getCollideSquare(); */