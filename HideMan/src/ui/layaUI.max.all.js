var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var testUI=(function(_super){
		function testUI(){
			
			testUI.__super.call(this);
		}
		CLASS$(testUI,'ui.testUI',_super);
		var __proto__=testUI.prototype;
		__proto__.createChildren=function(){
		    
			_super.prototype.createChildren.call(this);
			this.createView(testUI.uiView);
		}
		testUI.uiView={"type":"View","props":{"width":1920,"height":1536},"loadList":[],"loadList3D":[]};
		return testUI;
	})(View);