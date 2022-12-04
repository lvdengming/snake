// 定义食物类
class Food {
	// 定义一个属性表示食物所对应的 DOM 元素
	private element: HTMLElement;
	// 单位长度
	private statusLen: number;
	// 格子长度(=stageLen / statusLen)
	private cellsLen: number;
	// 位置
	private position: { x: number; y: number };

	// stageLen：蛇活动长度/宽度，statusLen：单位长度，即一节蛇长度/宽度
	constructor(stageLen = 300, statusLen = 15) {
		// 获取页面中的 food 元素并将其赋值给 element
		// "!" 表示获取元素不可能为空
		this.element = document.getElementById('food')!;
		this.statusLen = statusLen;
		this.cellsLen = Math.round(stageLen / statusLen);
		this.position = { x: 0, y: 0 };
		
		this.move();
	}

	// 定义获取食物在页面中 x 坐标的 getter
	get X(): number {
		return this.element.offsetLeft;
	}
	// 定义获取食物在页面中 y 坐标的 getter
	get Y(): number {
		return this.element.offsetTop;
	}
	// 定义获取食物相对于活动区域位置的 getter
	get positionXY(): { x: number; y: number } {
		return this.position;
	}
	

	// 改变食物的位置[蛇的活动区域划分成 n*n 整数格子]
	public move(): { x: number; y: number } {
		const x = Math.round(Math.random() * (this.cellsLen - 1)) * this.statusLen;
		const y = Math.round(Math.random() * (this.cellsLen - 1)) * this.statusLen;
		// 设置食物的坐标
		this.element.style.top = y + 'px';
		this.element.style.left = x + 'px';
		// 记录食物位置
		this.position = { x, y };
		return this.position;
	}
}

// 导出 Food 类
export default Food;

// 测试 Food 类
// const food = new Food();
// window.setInterval(() => {
// 	food.move();
// 	console.log(food.X, food.Y);
// }, 500);
