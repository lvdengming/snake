// 定义计分板类
class ScorePanel {
	// score、level 分别用来记录分数和等级
	public score: number;
	public level: number;
	// 最大等级（等级越高，蛇移动速度越快）
	private maxLevel: number;
	// scoreEle、levelEle 分别用来记录分数和等级对应的 DOM 元素
	private scoreEle: HTMLElement;
	private levelEle: HTMLElement;
	// HTML 中固定的字符串
	public static readonly ScoreStr = 'SCORE: ';
	public static readonly LevelStr = 'LEVEL: ';

	// 初始化属性
	constructor(maxLevel = 10) {
		this.score = 0;
		this.level = 1;
		this.maxLevel = maxLevel;
		// "!" 表示获取元素可能为空
		this.scoreEle = document.getElementById('score')!;
		this.levelEle = document.getElementById('level')!;
	}

	// 得分
	public scored(): void {
		this.score++;
		this.scoreEle.innerHTML = ScorePanel.ScoreStr + this.score;
		// 若分数增加，等级会发生相应改变
		if (this.score != 0 && this.score % 10 === 0) {
			this.levelUp();
		}
	}
	// 升级
	private levelUp(): void {
		if (this.level < this.maxLevel) {
			this.level++; // 等级发生改变
			this.levelEle.innerHTML = ScorePanel.LevelStr + this.level; // 页面样式发生相应改变
		}
	}
}

// 导出 ScorePanel 类
export default ScorePanel;

// 测试代码
// const panel = new ScorePanel();
// window.setInterval(() => {
// 	panel.scored();
// }, 1000);
