import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
//游戏控制器，控制其他的所有类
class GameControl{
    //定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction:string='';
    //创建一个属性记录游戏是否技术
    isLive:boolean=true;
    constructor() {
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel(10,1);

        this.init();
    }
    //游戏的初始化，调用后开始游戏
    init(){
        //绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        this.run();

    }

    //创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        //需要检查event.key的值是否合法（用户是否按了正确的按键）
        this.direction=event.key;
    }

    //创建一个控制蛇移动的方法
    run(){
      //根据方向(this.direction)来使蛇的位置改变
      // 获取当前坐标
      let X=this.snake.X;
      let Y=this.snake.Y;

      switch (this.direction){
          case "ArrowUp":
          case "Up":
              Y-=10;
              break;
          case "ArrowDown":
          case "Down":
              Y+=10;
              break;
          case "ArrowLeft":
          case "Left":
              X-=10;
              break;
          case "ArrowRight":
          case "Right":
              X+=10;
              break;
      }
      //检查蛇是否吃到了食物
      this.checkEat(X,Y);


      try{
          this.snake.X=X;
          this.snake.Y=Y;
      }catch(e:any){
          alert(e.message+'\n GAME OVER!');
          this.isLive=false;
      }

      this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
    }
    //定义一个方法，检查蛇是否迟到食物
    checkEat(X:number,Y:number){
      if(X===this.food.X&&Y===this.food.Y){
          //食物位置进行重置
          this.food.change();
          //分数增加
          this.scorePanel.addScore();
          //蛇增加一节
          this.snake.addBody();
      }
    }
}
//testing code
// const scorePanel=new ScorePanel(100,2);
// for (let i = 0; i < 200; i++) {
//     scorePanel.addScore();
// }
//
// const food=new Food();
// console.log(food.X,food.Y)
// food.change()
// console.log(food.X,food.Y)
export default GameControl;