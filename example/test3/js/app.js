var App = Ember.Application.create({});
App.Router.map(function() {
	this.route('index', {
		path: '/'
	});
	this.route('about', {
		path: '/about'
	});
	this.resource('list', {
		path: '/list'
	}, function() {
		this.route('info', {
			path: '/info/:id'
		});
	});
})
App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('list');
	}
});
App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'example/test3'
});
App.Store = DS.Store.extend({
	adapter: DS.RESTAdapter
});
App.ListRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('list')
	},
	afterModel: function() {
		//console.log(this.store.find('list'))
	}
});
App.List = DS.Model.extend({
	title: DS.attr('string')
});
App.ListInfoRoute = Ember.Route.extend({
	model: function(param) {
		console.log(this.store.find('list', param.id))
		return this.store.find('list', param.id)
	}
});
App.ListController = Ember.ArrayController.extend({
	xxx:'asdf'
});
App.ListInfoController = Ember.ObjectController.extend({
	needs:["list"],
	contentObserver: function() {
		//alert(1)
		//this.set('html',"123");
		var page = this.get('content');
		$.get('list/' + page.get('id') + '.md', function(result) {
			//var converter = new Showdown.converter();
			//page.set('html', new Handlebars.SafeString(converter.makeHtml(result)));
			page.set('html',result);
		}).error(function() {
			page.set('html', "404")
		});
	}.observes('content')
});
Ember.Handlebars.registerHelper('convertMarkdown',function(value,options){
	var converter= new Showdown.converter();
	return new Handlebars.SafeString(converter.makeHtml(value));
});