var Ds = DS.attr;
Montric.MainMenu = DS.Model.extend({
	name: Ds("string"),
	nodeType: Ds('string'),
	parent: DS.belongsTo('mainMenu'),
	child: DS.hasMany('mainMenu'),
	//chart: DS.belongsTo('chart'),
	isSelected: false,
	isExpanded: false,
	hasChild: function() {
		return this.get('child').get('length') > 0;
	}.property('child').cacheable(),
	isLeaf: function() {
		return this.get('child').get('length') == 0;
	}.property('child').cacheable(),
	isTop:function(){
		return this.get('parent').get('length') ;
	}.property('parent').cacheable()
});