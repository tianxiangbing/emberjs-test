var App = Ember.Application.create();
App.Router.map(function() {
	this.resource('index', {
		path: '/'
	});
});
App.IndexRoute = Ember.Route.extend({
	model: function() {
		console.log(this.store.find('test'))
		return this.store.find('test');
	}
});
/** Ember Data **/
App.Test = DS.Model.extend({
     title: DS.attr('string'),
	desc: DS.attr('string')
});
App.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'test2'
});

App.IndexController = Ember.ArrayController.extend({
	title:null,
	actions:{
		add:function(){
			console.log(this.get('model'))
			console.log(this.get('title'))
			var newRecord= this.store.createRecord('test',{
			title:this.get('title')
			});
			newRecord.save();
			this.set("title",null);
		},
		del:function(record){
			this.store.deleteRecord(r);
			r.save();
		}
	}
});