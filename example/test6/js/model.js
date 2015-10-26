Emberfest.Model = Ember.Object.extend();
Emberfest.Model.reopenClass({
	find: function(id, type) {
		var foundItem = this.contentArrayContains(id, type);
		if (!foundItem) {
			foundItem = type.create({
				id: id,
				isLoaded: false
			});
			Ember.get(type, 'collection').pushObject(foundItem);
		}
		return foundItem
	},
	contentArrayContains: function(id, type) {
		var arr = Ember.get(type, 'collection');
		var obj = null;
		arr.forEach(function(item) {
			if (item.id == id) {
				obj = item;
				return;
			}
		});
		return obj;
	},
	findAll: function(url, type, key) {
		var collection = this;
		$.getJSON(url, function(data) {
			$.each(data[key], function(i, row) {
				var item = collection.contentArrayContains(row.id, type);
				if (!item) {
					item = type.create();
					Ember.get(type, 'collection').pushObject(item);
				}
				item.setProperties(row);
				item.set('isLoaded', true);
			});
		});
		return Ember.get(type, 'collection')
	}
});

Emberfest.Talk = Emberfest.Model.extend();
Emberfest.Talk.reopenClass({
	collection: Ember.A(),
	find: function(id) {
		return Emberfest.Model.find(id, Emberfest.Talk);
	},
	findAll: function() {
		console.log('findall')
		return Emberfest.Model.findAll('abstracts', Emberfest.Talk, 'abstracts')
	}
});
Emberfest.User = Emberfest.Model.extend();
Emberfest.User.reopenClass({
	collection: Ember.A(),
	find: function(id) {
		return Emberfest.Model.find(id, Emberfest.User);
	},
	findAll: function() {
		return Emberfest.Model.findAll('user', Emberfest.User, 'users');
	}
});