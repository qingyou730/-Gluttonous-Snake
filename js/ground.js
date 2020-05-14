var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);
// console.log(ground);

ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.background = 'orange';
    document.body.appendChild(this.viewContent);

    this.squareTable = [
        [],
        [],
        [],
        [],
        //...
    ];

    /* var newSquare=SquareFactory.create('Wall', 1, 1, 'black');
    console.log(newSquare); */

    for (var y = 0; y < tr; y++) {  //外层循环走的是行数
        this.squareTable[y] = new Array(td);
        for (var x = 0; x < td; x++) {  //里层循环走的是列数
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                //这个条件成立，代表走的是围墙
                var newSquare = SquareFactory.create('Wall', x, y, 'black');
            } else {
                //这个条件成立，代表走的是地板
                var newSquare = SquareFactory.create('Floor', x, y, 'grey');
            }

            this.viewContent.appendChild(newSquare.viewContent);
            this.squareTable[y][x] = newSquare;
        }
    }

    console.log(this.squareTable);
};

// ground.init();

//删除一个方块
ground.remove = function (x, y) {
    var curSquare = this.squareTable[y][x];

    this.viewContent.removeChild(curSquare.viewContent);

    this.squareTable[y][x]=null;
}
//添加一个方块
ground.append=function(square){
    this.viewContent.appendChild(square.viewContent);

    this.squareTable[square.y][square.x]=square;
}