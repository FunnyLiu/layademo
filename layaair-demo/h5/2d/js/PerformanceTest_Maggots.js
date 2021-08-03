let 
	texturePath = "res/tinyMaggot.png",

	padding = 100,
	maggotAmount = 5000,

	tick = 0,
	maggots = [],
	wrapBounds,
	maggotTexture;

class PerformanceTest_Maggots {
	constructor() {
		const 
			Browser = Laya.Browser,
			WebGL = Laya.WebGL,
			Stage = Laya.Stage,
			Stat = Laya.Stat,
			Handler = Laya.Handler,
			Rectangle = Laya.Rectangle;

		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.width, Browser.height, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		Stat.show();

		wrapBounds = new Rectangle(-padding, -padding, Laya.stage.width + padding * 2, Laya.stage.height + padding * 2);

		Laya.loader.load(texturePath, Handler.create(this, this.onTextureLoaded));
	}

	onTextureLoaded() {
		maggotTexture = Laya.loader.getRes(texturePath);
		this.initMaggots();
		Laya.timer.frameLoop(1, this, this.animate);
	}

	initMaggots() {
		let maggotContainer;
		for (let i = 0; i < maggotAmount; i++) {
			if (i % 16000 == 0)
				maggotContainer = this.createNewContainer();

			let maggot = this.newMaggot();
			maggotContainer.addChild(maggot);
			maggots.push(maggot);
		}
	}

	createNewContainer() {
		const 
			Sprite = Laya.Sprite,
			Browser = Laya.Browser;

		let container = new Sprite();
		container.size(Browser.clientWidth, Browser.clientHeight);
		// 此处cacheAsBitmap主要是为了创建新画布
		// 解除IBQuadrangle数量限制
		// 在显示虫子数量超过16383时需要打开下面一行
		// container.cacheAsBitmap = true;
		Laya.stage.addChild(container);
		return container;
	}

	newMaggot() {
		const Sprite = Laya.Sprite;

		let maggot = new Sprite();
		maggot.graphics.drawTexture(maggotTexture, 0, 0);

		maggot.pivot(16.5, 35);

		let rndScale = 0.8 + Math.random() * 0.3;
		maggot.scale(rndScale, rndScale);
		maggot.rotation = 0.1;
		maggot.x = Math.random() * Laya.stage.width;
		maggot.y = Math.random() * Laya.stage.height;

		maggot.direction = Math.random() * Math.PI;
		maggot.turningSpeed = Math.random() - 0.8;
		maggot.speed = (2 + Math.random() * 2) * 0.2;
		maggot.offset = Math.random() * 100;

		return maggot;
	}

	animate() {
		let maggot;
		let wb = wrapBounds;
		let angleUnit = 180 / Math.PI;
		let dir, x = 0.0, y = 0.0;
		for (let i = 0; i < maggotAmount; i++)
		{
			maggot = maggots[i];

			maggot.scaleY = 0.90 + Math.sin(tick + maggot.offset) * 0.1;

			maggot.direction += maggot.turningSpeed * 0.01;
			dir = maggot.direction;
			x = maggot.x;
			y = maggot.y;

			x += Math.sin(dir) * (maggot.speed * maggot.scaleY);
			y += Math.cos(dir) * (maggot.speed * maggot.scaleY);

			maggot.rotation = (-dir + Math.PI) * angleUnit;

			if (x < wb.x)
				x += wb.width;
			else if (x > wb.x + wb.width)
				x -= wb.width;
			if (y < wb.y)
				y += wb.height;
			else if (y > wb.y + wb.height)
				y -= wb.height;

			maggot.pos(x, y);
		}

		tick += 0.1;
	}
}

new PerformanceTest_Maggots();