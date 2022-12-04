import Direction from './Direction';
import State from './State';

// 定义蛇类
class Snake {
	// 蛇
	private element: HTMLElement;
	// 蛇头
	private head: HTMLElement;
	// 蛇身（包括蛇头）
	private bodies: HTMLCollection;
	// 蛇的单位长度
	private statusLen: number;
	// stageLen：蛇活动长度/宽度
	private stageLen: number;
	// 蛇移动的方向
	public direction = Direction.Right;
	// 蛇是否存活
	public state: State;

	constructor(stageLen = 300) {
		this.element = document.getElementById('snake')!;
		// 通过 as 关键字将 ELment 类型转换成 HTMLElement 类型
		this.head = document.querySelector('#snake>div') as HTMLElement;
		this.bodies = this.element.getElementsByTagName('div');
		this.statusLen = this.head.offsetWidth;
		this.stageLen = stageLen;
		this.state = State.Running;
	}

	// 获取蛇头 X 坐标
	get Head_X(): number {
		return this.head.offsetLeft;
	}
	// 设置蛇头 X 坐标
	set Head_X(value: number) {
		this.head.style.left = value + 'px';
	}
	// 获取蛇头 Y 坐标
	get Head_Y(): number {
		return this.head.offsetTop;
	}
	// 设置蛇头 Y 坐标
	set Head_Y(value: number) {
		this.head.style.top = value + 'px';
	}

	// 蛇吃到食物进行了生长
	public grow(): void {
		// 向 this.element 中添加一个 div
		this.element.insertAdjacentHTML('beforeend', '<div style="display: none;"></div>');
	}

	// 向上移动
	public moveUp(): void {
		// 循环中前置元素的上一次位置
		let frontEleLastPos = { x: this.Head_X, y: this.Head_Y };

		// 蛇头移动
		this.Head_Y = this.Head_Y - this.statusLen;
		// 判断是否撞墙
		if (this.Head_Y < 0) {
			// 蛇头不能溢出
			this.Head_Y = this.Head_Y + this.statusLen;
			this.state = State.End;
			throw new Error('GAME OVER!');
		}
		// 判断是否撞到自身
		this.testHitSelf(Direction.Up);

		// 移动蛇身
		this.state == State.Running && this.moveBody(frontEleLastPos);
		// 若吃到食物，则生长
		this.state == State.Running && ((this.bodies[this.bodies.length - 1] as HTMLElement).style.display = 'block');
	}

	// 向右移动
	public moveRight(): void {
		// 循环中前置元素的上一次位置
		let frontEleLastPos = { x: this.Head_X, y: this.Head_Y };

		// 蛇头移动
		this.Head_X = this.Head_X + this.statusLen;
		// 判断是否撞墙
		if (this.Head_X > this.stageLen - this.statusLen) {
			// 蛇头不能溢出
			this.Head_X = this.Head_X - this.statusLen;
			this.state = State.End;
			throw new Error('GAME OVER!');
		}
		// 判断是否撞到自身
		const bodies = Array.from(this.bodies); // 蛇的各个节点，包含蛇头
		this.testHitSelf(Direction.Right);

		// 移动蛇身
		this.state == State.Running && this.moveBody(frontEleLastPos);
		// 若吃到食物，则生长
		this.state == State.Running && ((this.bodies[this.bodies.length - 1] as HTMLElement).style.display = 'block');
	}

	// 向下移动
	public moveDown(): void {
		// 循环中前置元素的上一次位置
		let frontEleLastPos = { x: this.Head_X, y: this.Head_Y };

		// 蛇头移动
		this.Head_Y = this.Head_Y + this.statusLen;
		// 判断是否撞墙
		if (this.Head_Y > this.stageLen - this.statusLen) {
			// 蛇头不能溢出
			this.Head_Y = this.Head_Y - this.statusLen;
			this.state = State.End;
			throw new Error('GAME OVER!');
		}
		// 判断是否撞到自身
		const bodies = Array.from(this.bodies); // 蛇的各个节点，包含蛇头
		this.testHitSelf(Direction.Down);

		// 移动蛇身
		this.state == State.Running && this.moveBody(frontEleLastPos);
		// 若吃到食物，则生长
		this.state == State.Running && ((this.bodies[this.bodies.length - 1] as HTMLElement).style.display = 'block');
	}

	// 向左移动
	public moveLeft(): void {
		// 循环中前置元素的上一次位置
		let frontEleLastPos = { x: this.Head_X, y: this.Head_Y };

		// 蛇头移动
		this.Head_X = this.Head_X - this.statusLen;
		// 判断是否撞墙
		if (this.Head_X < 0) {
			// 蛇头不能溢出
			this.Head_X = this.Head_X + this.statusLen;
			this.state = State.End;
			throw new Error('GAME OVER!');
		}
		// 判断是否撞到自身
		const bodies = Array.from(this.bodies); // 蛇的各个节点，包含蛇头
		this.testHitSelf(Direction.Left);

		// 移动蛇身
		this.state == State.Running && this.moveBody(frontEleLastPos);
		// 若吃到食物，则生长
		this.state == State.Running && ((this.bodies[this.bodies.length - 1] as HTMLElement).style.display = 'block');
	}

	// 测试蛇头是否撞到自身
	private testHitSelf(direction: Direction): void {
		if (this.hitSnake({ x: this.Head_X, y: this.Head_Y })) {
			// 蛇头不能溢出
			switch (direction) {
				case Direction.Up:
					this.Head_Y = this.Head_Y + this.statusLen;
					break;
				case Direction.Right:
					this.Head_X = this.Head_X - this.statusLen;
					break;
				case Direction.Down:
					this.Head_Y = this.Head_Y - this.statusLen;
					break;
				case Direction.Left:
					this.Head_X = this.Head_X + this.statusLen;
					break;
			}

			this.state = State.End;
			throw new Error('GAME OVER!');
		}
	}

	// 蛇身移动
	private moveBody(frontEleLastPos: { x: number; y: number }): void {
		const bodies = Array.from(this.bodies); // 蛇的各个节点，包含蛇头
		bodies.forEach((segment: Element, index: number) => {
			if (index != 0) {
				let segmentHE = segment as HTMLElement;
				let tempXY = { x: segmentHE.offsetLeft, y: segmentHE.offsetTop };
				[segmentHE.style.top, segmentHE.style.left] = [frontEleLastPos.y + 'px', frontEleLastPos.x + 'px'];
				[frontEleLastPos.x, frontEleLastPos.y] = [tempXY.x, tempXY.y];
			}
		});
	}

	// 判断节点是否撞到蛇
	public hitSnake(node: { x: number; y: number }): boolean {
		let result = false;
		const bodies = Array.from(this.bodies); // 蛇的各个节点，包含蛇头
		bodies.forEach((segment: Element, index: number) => {
			if (index != 0) {
				let segmentHE = segment as HTMLElement;
				if (node.x == segmentHE.offsetLeft && node.y == segmentHE.offsetTop) {
					result = true;
				}
			}
		});

		return result;
	}
}

// 导出蛇类
export default Snake;
