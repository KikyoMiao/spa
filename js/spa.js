var spa=(function(){
	'use strict'
	var initModule = function($container){
		spa.model.initModule();
		spa.shell.init($container)
	};

	return { init : initModule };
}());