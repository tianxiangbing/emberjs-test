Emberfest.Router.map(function() {
	this.route('tickets');
	this.route('talks',{path:'talks'});
	this.resource('talks',  {
		path: '/talks'
	},function() {
	//这里要用resource,如果这里用route 的话，只会在第一次刷新时进TalksTalkRoute的model里.
		this.resource('talk', {
			path: '/talk/:talk_id'
		})
	});
	this.route('registerTalk');
});
Emberfest.IndexRoute = Ember.Route.extend({
	model: function() {}
})
Emberfest.TalksRoute = Ember.Route.extend({
	model: function() {
		return Emberfest.Talk.findAll();
	}
});
Emberfest.TalkRoute = Ember.Route.extend({
	model:function(args){
		console.log(args)
		return Emberfest.Talk.find(args.talk_id);
	}
});
