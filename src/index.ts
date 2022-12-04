// 引入样式
import './index.less';
// 引入游戏控制类
import GameController from './modules/GameController';

const controller = new GameController();
controller.init(); // 初始化游戏
controller.start(); // 启动游戏