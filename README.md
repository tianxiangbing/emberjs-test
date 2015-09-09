#初始emberjs
首页我们要做的是从网上下载下来emberjs相关的文件,目前在1.x的版本中，ember是要依赖jquery（v1.7.1~2.2.0) 和handlebars(v1.x)的，有一个比较好的方式来得到这些资源，那就是用[bower](http://bower.io/).bower的安装很简单:

	npm install -g bower	

装完bower就可以使用bower来下载资源了,比如我们要下载jquery 1.9.1版本的，我们可以这样写

	bower install jquery#1.9.1
