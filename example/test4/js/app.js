var App = Ember.Application.create();
App.BookDetailView= Ember.View.extend({
	templateName:'book'
});
App.BooksView= Ember.View.extend({
	templateName:'books'
});
App.IndexRoute=Ember.Route.extend({
	model:function(){
		return {books:[{name:"js"}]}
	}
});