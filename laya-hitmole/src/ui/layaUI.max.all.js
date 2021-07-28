var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.timeBar=null;
		    this.scoreNum=null;
			GameUI.__super.call(this);
		}
		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			_super.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);
		}
		GameUI.uiView={"type":"View","props":{"width":800,"height":600},"compId":1,"child":[{"type":"Image","props":{"y":25,"x":25,"skin":"ui/back.png"},"compId":2},{"type":"Box","props":{"y":195,"x":157,"name":"item0"},"compId":7,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":3},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":4},{"type":"Image","props":{"y":86,"skin":"ui/mask-01.png"},"compId":5},{"type":"Image","props":{"y":10,"x":66,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":76}]},{"type":"Box","props":{"y":192,"x":340,"name":"item1"},"compId":8,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":9},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":10},{"type":"Image","props":{"y":86,"skin":"ui/mask-02.png"},"compId":11},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":80}]},{"type":"Box","props":{"y":194,"x":542,"name":"item2"},"compId":12,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":13},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":14},{"type":"Image","props":{"y":86,"skin":"ui/mask-03.png"},"compId":15},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":81}]},{"type":"Box","props":{"y":280,"x":128,"name":"item3"},"compId":16,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":17},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":18},{"type":"Image","props":{"y":86,"skin":"ui/mask-04.png"},"compId":19},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":82}]},{"type":"Box","props":{"y":285,"x":346,"name":"item4"},"compId":20,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":21},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":22},{"type":"Image","props":{"y":86,"skin":"ui/mask-05.png"},"compId":23},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":84}]},{"type":"Box","props":{"y":279,"x":543,"name":"item5"},"compId":24,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":25},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":26},{"type":"Image","props":{"y":86,"skin":"ui/mask-06.png"},"compId":27},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":85}]},{"type":"Box","props":{"y":382,"x":123,"name":"item6"},"compId":28,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":29},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":30},{"type":"Image","props":{"y":86,"skin":"ui/mask-07.png"},"compId":31},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":86}]},{"type":"Box","props":{"y":387,"x":345,"name":"item7"},"compId":32,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":33},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":34},{"type":"Image","props":{"y":86,"skin":"ui/mask-08.png"},"compId":35},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":87}]},{"type":"Box","props":{"y":388,"x":564,"name":"item8"},"compId":36,"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"ui/mouse_normal_1.png","name":"normal"},"compId":37},{"type":"Image","props":{"y":14,"x":6,"skin":"ui/mouse_hit_1.png","name":"hit"},"compId":38},{"type":"Image","props":{"y":86,"skin":"ui/mask-09.png"},"compId":39},{"type":"Image","props":{"y":20,"x":76,"width":86,"skin":"ui/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5},"compId":88}]},{"type":"ProgressBar","props":{"y":10,"x":10,"var":"timeBar","value":1,"skin":"ui/progress_time.png"},"compId":64},{"type":"Box","props":{"y":40,"x":50,"var":"scoreNum"},"compId":75,"child":[{"type":"Clip","props":{"skin":"ui/clip_number.png","name":"item0","clipX":10,"autoPlay":false},"compId":65},{"type":"Clip","props":{"x":18,"skin":"ui/clip_number.png","name":"item1","clipX":10,"autoPlay":false},"compId":66},{"type":"Clip","props":{"x":36,"skin":"ui/clip_number.png","name":"item2","clipX":10,"autoPlay":false},"compId":67},{"type":"Clip","props":{"x":54,"skin":"ui/clip_number.png","name":"item3","clipX":10,"autoPlay":false},"compId":68},{"type":"Clip","props":{"x":72,"skin":"ui/clip_number.png","name":"item4","clipX":10,"autoPlay":false},"compId":69},{"type":"Clip","props":{"x":90,"skin":"ui/clip_number.png","name":"item5","clipX":10,"autoPlay":false},"compId":70},{"type":"Clip","props":{"x":108,"skin":"ui/clip_number.png","name":"item6","clipX":10,"autoPlay":false},"compId":71},{"type":"Clip","props":{"x":126,"skin":"ui/clip_number.png","name":"item7","clipX":10,"autoPlay":false},"compId":72},{"type":"Clip","props":{"x":144,"skin":"ui/clip_number.png","name":"item8","clipX":10,"autoPlay":false},"compId":73},{"type":"Clip","props":{"x":162,"skin":"ui/clip_number.png","name":"item9","clipX":10,"autoPlay":false},"compId":74}]}],"loadList":["ui/back.png","ui/mouse_normal_1.png","ui/mouse_hit_1.png","ui/mask-01.png","ui/score_2.png","ui/mask-02.png","ui/mask-03.png","ui/mask-04.png","ui/mask-05.png","ui/mask-06.png","ui/mask-07.png","ui/mask-08.png","ui/mask-09.png","ui/progress_time.png","ui/clip_number.png"],"loadList3D":[]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.restartBtn=null;
		    this.scoreNum=null;
			GameOverUI.__super.call(this);
		}
		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			_super.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);
		}
		GameOverUI.uiView={"type":"View","props":{"width":500,"height":400},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"skin":"ui/overBg.png","height":400,"sizeGrid":"10,10,10,10"},"compId":2},{"type":"Image","props":{"y":25,"x":15,"skin":"ui/total Score.png"},"compId":3},{"type":"Button","props":{"y":290,"x":161,"var":"restartBtn","stateNum":2,"skin":"ui/btn_restart.png"},"compId":4},{"type":"Box","props":{"y":190,"x":160,"var":"scoreNum"},"compId":5,"child":[{"type":"Clip","props":{"skin":"ui/clip_number.png","name":"item0","clipX":10,"autoPlay":false},"compId":6},{"type":"Clip","props":{"x":18,"skin":"ui/clip_number.png","name":"item1","clipX":10,"autoPlay":false},"compId":7},{"type":"Clip","props":{"x":36,"skin":"ui/clip_number.png","name":"item2","clipX":10,"autoPlay":false},"compId":8},{"type":"Clip","props":{"x":54,"skin":"ui/clip_number.png","name":"item3","clipX":10,"autoPlay":false},"compId":9},{"type":"Clip","props":{"x":72,"skin":"ui/clip_number.png","name":"item4","clipX":10,"autoPlay":false},"compId":10},{"type":"Clip","props":{"x":90,"skin":"ui/clip_number.png","name":"item5","clipX":10,"autoPlay":false},"compId":11},{"type":"Clip","props":{"x":108,"skin":"ui/clip_number.png","name":"item6","clipX":10,"autoPlay":false},"compId":12},{"type":"Clip","props":{"x":126,"skin":"ui/clip_number.png","name":"item7","clipX":10,"autoPlay":false},"compId":13},{"type":"Clip","props":{"x":144,"skin":"ui/clip_number.png","name":"item8","clipX":10,"autoPlay":false},"compId":14},{"type":"Clip","props":{"x":162,"skin":"ui/clip_number.png","name":"item9","clipX":10,"autoPlay":false},"compId":15}]}],"loadList":["ui/overBg.png","ui/total Score.png","ui/btn_restart.png","ui/clip_number.png"],"loadList3D":[]};
		return GameOverUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.startBtn=null;
			GameStartUI.__super.call(this);
		}
		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			_super.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);
		}
		GameStartUI.uiView={"type":"View","props":{"width":800,"height":600},"compId":1,"child":[{"type":"Image","props":{"y":55,"x":38,"skin":"ui/help.png"},"compId":2},{"type":"Button","props":{"y":450,"x":311,"var":"startBtn","stateNum":2,"skin":"ui/btn_start.png"},"compId":3}],"loadList":["ui/help.png","ui/btn_start.png"],"loadList3D":[]};
		return GameStartUI;
	})(View);
var HammerUI=(function(_super){
		function HammerUI(){
			
		    this.hit=null;
		    this.hammer=null;
			HammerUI.__super.call(this);
		}
		CLASS$(HammerUI,'ui.HammerUI',_super);
		var __proto__=HammerUI.prototype;
		__proto__.createChildren=function(){
		    
			_super.prototype.createChildren.call(this);
			this.createView(HammerUI.uiView);
		}
		HammerUI.uiView={"type":"View","props":{"width":100,"height":100},"compId":1,"child":[{"type":"Image","props":{"y":60,"x":55,"width":98,"var":"hammer","skin":"ui/hammer.png","pivotY":49,"pivotX":54,"height":77},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"rotation":[{"value":-20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":0},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":1}]}}],"name":"hit","id":1,"frameRate":24,"action":0}],"loadList":["ui/hammer.png"],"loadList3D":[]};
		return HammerUI;
	})(View);