var StudentManager = new Marionette.Application();

StudentManager.addRegions({
	mainRegion: "#main-region"
}); 
		
StudentManager.navigate = function(route, options){
	options || (options = {});
	Backbone.history.navigate(route, options);
};

StudentManager.on("start", function(){
	StudentManager.trigger("students:list");
});

Backbone.history.start({root: "/"});


