var spa=(function(){
	var initModule = function($container){
		spa.shell.init($container)
	};

	return { init : initModule };
}());