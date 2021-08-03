var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var StartUI=(function(_super){
		function StartUI(){
			
		    this.startBtn=null;
			StartUI.__super.call(this);
		}
		CLASS$(StartUI,'ui.StartUI',_super);
		var __proto__=StartUI.prototype;
		__proto__.createChildren=function(){
		    
			_super.prototype.createChildren.call(this);
			this.createView(StartUI.uiView);
		}
		StartUI.uiView={"type":"View","props":{"width":1024,"height":768},"compId":1,"child":[{"type":"Button","props":{"y":384,"x":512,"width":200,"var":"startBtn","skin":"comp/button.png","pivotY":50,"pivotX":100,"labelSize":30,"label":"开始游戏","height":100},"compId":3}],"loadList":["comp/button.png"],"loadList3D":[]};
		return StartUI;
	})(View);