window.App = Ember.Application.create();
App.Router.map(function() {
	this.resource('index',{path:'/'},function(){
		console.log('index')
		this.route('add');
	})
});
App.AddRoute = Ember.Route.extend({
	setupController: function(c,model) {
		console.log(1)
		console.log(model)
		c.set('model',model)
	},
	model: function() {
		console.log(22)
		return  [{
				name: "txb"
			}]
	}
});