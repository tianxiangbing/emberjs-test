Montric.Store = DS.Store.extend({
	adapter: "Montric.Adapter"
});
Montric.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'example/test5'
});
Montric.Adapter = DS.RESTAdapter.extend({
	defaultSerializer: "Montric/application"
});
Montric.MainMenuAdapter = DS.RESTAdapter.extend({
	findAll:function (store,type,id){
	console.log(this.buildURL(type.typeKey,id))
		return this.ajax(this.buildURL(type.typeKey,id),'POST');
	},
	buildURL:function(type,id){
		var host = Ember.get(this,'host'),
			namespace= Ember.get(this,'namespace'),
			url=[];
		if(host){url.push(host);}
		if(namespace){url.push(namespace);}
		url.push(Ember.String.pluralize(type));
		if(id){url.push(id);}

		url= url.join('/');
		if(!host){
			url='/'+url;
		}
		return url;
	},
	//defaultSerializer: "Montric/application",
	namespace: 'example/test5',
	host:'http://localhost:3000'
});
Montric.MainMenuSerializer=DS.RESTSerializer.extend({
	extractArray:function(store,type,payload){
		return payload.data
	}
});
Montric.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('mainMenu')
	}
});