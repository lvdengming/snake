import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';
import Direction from './Direction';
import State from './State';

// 定义游戏控制类
class GameController {
	// 蛇
	private snake: Snake;
	// 食物
	private food: Food;
	// 得分面板
	private scorePanel: ScorePanel;

	// 初始指数[贪吃蛇速度 = 初始指数 - (n-1)*难度指数，其中 n 表示游戏等级]
	private initIndex: number;
	// 难度指数
	private difficultIndex: number;
	// 游戏 ID
	private id: number = -1;

	constructor(initIndex = 400, difficultIndex = 50) {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel();

		this.initIndex = initIndex;
		this.difficultIndex = difficultIndex;
	}

	// 初始化游戏
	public init(): void {
		// 添加键盘监听事件
		document.addEventListener('keydown', this.keydownHandler.bind(this));
	}

	// 键盘按压处理方法
	private keydownHandler(event: KeyboardEvent): void {
		switch (event.key) {
			// 上
			case 'Up':
			case 'ArrowUp':
			case 'w':
			case '8':
				if (this.snake.direction != Direction.Down) this.snake.direction = Direction.Up;
				break;
			// 右
			case 'Right':
			case 'ArrowRight':
			case 'd':
			case '6':
				if (this.snake.direction != Direction.Left) this.snake.direction = Direction.Right;
				break;
			// 下
			case 'Down':
			case 'ArrowDown':
			case 's':
			case '2':
				if (this.snake.direction != Direction.Up) this.snake.direction = Direction.Down;
				break;
			// 左
			case 'Left':
			case 'ArrowLeft':
			case 'a':
			case '4':
				if (this.snake.direction != Direction.Right) this.snake.direction = Direction.Left;
				break;
			// 暂停
			case 'p':
				this.pause();
				break;
			// 恢复(取消暂停)
			case 'u':
				this.unpause();
				break;
			// 重置
			case 'r':
				this.restart();
				break;
		}
	}

	// 启动游戏
	public start(): void {
		this.id = window.setInterval(() => {
			// 监听游戏是否失败
			try {
				// 移动
				switch (this.snake.direction) {
					case Direction.Up:
						this.snake.state === State.Running && this.snake.moveUp();
						break;
					case Direction.Right:
						this.snake.state === State.Running && this.snake.moveRight();
						break;
					case Direction.Down:
						this.snake.state === State.Running && this.snake.moveDown();
						break;
					case Direction.Left:
						this.snake.state === State.Running && this.snake.moveLeft();
						break;
				}
			} catch (e) {
				// GAME OVER!
				const title = document.getElementById('state')!;
				title.innerHTML = '<span>GAME OVER</span>';
				title.style.color = 'rgb(255, 77, 79)';
				this.snake.state = State.End;
			}

			// 判断是否吃到食物
			if (this.snake.Head_X === this.food.positionXY.x && this.snake.Head_Y === this.food.positionXY.y) {
				// 计分板记录信息
				this.scorePanel.scored();
				// 蛇生长
				this.snake.grow();
				// 食物出现在下一个位置[将整个游戏看做二维世界，则食物不可能与蛇身重叠]
				while (this.snake.hitSnake(this.food.move())) {}
			}
		}, this.initIndex - (this.scorePanel.level - 1) * this.difficultIndex);
	}

	// 暂停游戏
	public pause(): void {
		const title = document.getElementById('state')!;
		title.innerHTML = 'Paused';
		title.style.color = 'rgb(250, 173, 20)';
		this.snake.state = State.Paused;
	}

	// 暂停后重新开始游戏
	public unpause(): void {
		const title = document.getElementById('state')!;
		title.innerHTML = 'Running...';
		title.style.color = 'rgb(82, 196, 26)';
		this.snake.state = State.Running;
	}

	// 重置游戏
	public restart(): void {
		window.location.reload();
	}
}

// 导出游戏控制类
export default GameController;
