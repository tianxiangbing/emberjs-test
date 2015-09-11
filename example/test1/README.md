##开始一个例子
然后我们要根据这些文件做一个简单的例子，我们新建一个html页面index.html,引用js文件，代码如下：

    <!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>emberjs 初学记要</title>
	  <script type="text/javascript" src="http://localhost:9090/livereload.js"></script>
	</head>
	<body>
	  <script type="text/javascript" src="bower_components/jquery/jquery.min.js"></script>
	  <script type="text/javascript" src="bower_components/handlebars/handlebars.min.js"></script>
	  <script type="text/javascript" src="bower_components/ember/ember.min.js"></script>
	</body>
	</html>

这里看到我在head里多引入了一个`livereload.js`，这个文件是使用`grunt watch`时生成的，可以动态的改变页面，你可以使用chrome的插件livereload.

好了，准备工作做好了之后 ，我们就可以编写首页的模板了，在页面添加如下代码：

	<script type="text/x-handlebars">
	首页
	</script>

然后新建一个js文件，这里命名为app.js，放在js目录下,引入.
	
	window.App = Ember.Application.create();

这时会发现页面上什么都没有，然后在console里还报了一个错：

	Uncaught Error: Cannot call `compile` without the template compiler loaded. Please load `ember-template-compiler.js` prior to calling `compile`.

这个错误的大致意思好像是说我没有ember-template-compiler.js文件，但奇了怪的是，所以解析模板时出错了;但是在更早期的版本里是不需要的，可能是后期为了移除handlebars所以独立出来了吧，在`bower_components/ember`中还真有这么个文件，好吧，引入它.

	<script type="text/javascript" src="bower_components/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/handlebars/handlebars.min.js"></script>
	<script type="text/javascript" src="bower_components/ember/ember-template-compiler.js"></script>
	<script type="text/javascript" src="bower_components/ember/ember.min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>

好了，页面终于出现内容了,然后我们在模板中加入`outlet`，这是一个其他模块的入口,然后我们在app.js中加入其他的模块路由.

	App.Router.map(function(){
		this.resource('add',{path:'add'});
	});


这里可以使用resource也可以直接用route

	this.route('add')

据说它们间的区别就是resource可以有子路由，但route已经是最小的路由了，所以可以理解为，大的类目时用recource,终极时用route，你开心就好。
然后我们添加add的模板,**这里add的模板id要和link-to的参数一致，并且跟resource或route的第一个参数一样，path参数指的是url里的hash值.**

	<script type="text/x-handlebars" id="add">
	<table>
	<tr>
	  <td>标题</td>
	  <td><input type="text" /></td>
	</tr>
	<tr>
	  <td>内容</td>
	  <td><textarea></textarea></td>
	</tr>
	<tr>
	  <td></td>
	  <td><input type="button" value="确认"></td>
	</tr>
	</table>
	</script>
这里有一个操作，所以应该有个Controller，我们先在app.js里加上这个controller.

	App.AddController=Ember.Controller.extend({
		actions:{
			new:function(){
				console.log('new')
				var title = $('#title').val();
				var content = $('#content').val();
				//do save
			}
		}
	});

它的命名规则是单词首字母大写，然后ember会把它注册到add这个模块里，这样你就可以在add模板中使用这个控制器了。把按钮改掉

	<input type="button" value="确认" {{action "new"}}>

由于我们现在还没有使用localStorage这类本地存储，所以我们可以使用变量来临时的保存一下，但实际的应用中，似乎更多的是与服务器的交互。
它义数组`var data=[];`然后再`action/new`下加入

	data.push({title:title,content:content});
	this.transitionToRoute('index');

`transitionToRoute`的意思就是转到另一个路由去。我们这里转到首页去，然后我们看到一片空白的首页，还不知道是什么情况，因为还没有写代码让刚才加入的记录显示出来，好，我们在首页的模板中把记录each出来.

	<script type="text/x-handlebars" id="index">
		<ol>
			{{#each model}}
			<li>{{title}}</li>
			{{/each}}
		</ol>
	</script>

这里`each`的是`model`，如果直接`each .`会导致不更新。然后我们添加一个IndexRoute来返回一个数据集.

	App.IndexRoute = Ember.Route.extend({
		model: function() {
			return data
		}
	});

这里的IndexRoute就会默认在路由到index首页时调用。

我们在添加一个查看的按钮查看详情，为了能找到当前记录，我们给每条记录加一个index属性记录当前索引：

	data.push({
		title: title,
		content: content,
		index:data.length
	});


	<li>{{title}}{{#link-to "info" this}}查看{{/link-to}}</li>

不知道为什么在这里不能直接取`@index`索引，所以只能我们在每条记录里加个唯一值。然后在路由中加上resouce

	this.resource('index', {
		path: '/'
	}, function() {
		this.resource('info', {
			path: 'info/:index'
		})
	})

这里我们把info的路由放在了index的下面，这样，就可以达到index和info同时存在了。这里要在index的模板中加上一个`{{outlet}}`才行。

  <script type="text/x-handlebars" id="info">
    <h1>{{model.title}}</h1>
    <p>
    {{model.content}}
    </p>
  </script>

同样的情况出现了，我要加上model才行,不明白的为什么`{{title}}`可以取出来content一定要`{{model.content}}`才行。在InfoRoute中返回当前的数组值

	App.InfoRoute = Ember.Route.extend({
		model: function(param) {
			console.log(data[param.index].content)
			return data[param.index]
		}
	});

在详情模板中加入编辑按钮，我们根据一个值来判断是显示“编辑”还是“保存”.

	<div style="float:left;">
    <h1>{{model.title}}</h1>
    <p>
    {{model.content}}
    </p>
    {{#if isEditing}}
      <button {{action "save"}}>保存</button>
    {{else}}
      <button {{action "edit"}}>编辑</button>
    {{/if}}
    </div>

这里的isEditing是在`Controller`的`action`中新增的一个属性，在`actions`中新增save和edit方法

	App.InfoController = Ember.ObjectController.extend({
		actions: {
			isEditing: false,
			edit: function() {
				this.set('isEditing',true);
			},
			save:function(){
				this.set('isEditing',false);
			}
		}
	});

这里的值都要使用set方法来改变，否则不会导致页面的刷新模板.然后我们加入一个子模板来显示编辑的内容。

	<script type="text/x-handlebars" id="post/edit">
	  <table>
	    <tr>
	      <td>标题</td>
	      <td>{{input type="text" value=title}}</td>
	    </tr>
	    <tr>
	      <td>内容</td>
	      <td>{{textarea value=model.content}}</td>
	    </tr>
	    <tr>
	      <td></td>
	      <td><input type="button" value="确认" {{action "save"}}></td>
	    </tr>
	  </table>
	  </script>

这里用的是`{{input}}`方式的控件，这样就可以实现传说中的双向绑定了，它是基于`Ember.TextField`类的，所以也是可以自定义一个Input控件的。如下官方例子所示[input api](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_input "input api"):
	
	Todos.EditTodoView = Ember.TextField.extend({
		didInsertElement: function() {
			this.$().focus();
		}
	});
	Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);

然后就莫名其妙地完成了保存操作，好吧，我以为我还要save一下，官方的例子是使用的model，所以要对先`this.get('model).save()`一下才会有用。

最后我们要做的就是删除了，先加一个action为del的链接按钮:

	{{#each model}}
	<li>{{title}}{{#link-to "info" this}}查看{{/link-to}} <a href="javascript:void(0)" {{action "del" index}}>删除</a></li>
	{{/each}}

然后在IndexController中新增del的action


	App.IndexController = Ember.ArrayController.extend({
		actions: {
			del: function(index) {
				var d = this.get('model');
				console.log(d)
				var obj = d.findBy('index',index)
				d.removeObject(obj)
			}
		}
	});

这里的问题是，我们要对model进行操作，才能实时的反应到页面上，看了下model的方法，可以使用`findBy`找出该元素，再进行`removeObject`

最终，我们就完成了一整个的增删改操作了。因为我也是在学习过程中，如果有什么不对的地方，请指出纠正吧!