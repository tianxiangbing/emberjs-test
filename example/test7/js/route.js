Emberfest.Router.map(function(){
	this.resource('index',{path:'/'},function(){
		this.resource('list',{path:'list'},function(){
			this.resource ('dynamic')
		})
	});
});
Emberfest.ListRoute = Ember.Route.extend({
	model:function(){
		return {test:1111};
	}
});
Emberfest.DynamicRoute= Ember.Route.extend({
	model:function(){
		return {test:222323}
	},
	renderTemplate:function(c,m){
		this.render('list',{
			model:m,
			outlet:'list'
		});
	}
});