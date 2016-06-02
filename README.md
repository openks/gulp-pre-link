# gulp-pre-link

## Install

    $ npm install --save-dev gulp-pre-link


## Usage


widget/nav.html
```html
<div class="nav">
	<ul>
		<li tag="0"><a href="index.html">首 页<br><span>HOME</span></a></li>
		<li tag="140"><a href="index.html">新闻公告<br><span>NEWS</span></a></li>
		<li tag="280"><a href="###">数据中心<br><span>DATA</span></a></li>
		<li tag="420"><a href="index.html">视频图集<br><span>VIDEO</span></a></li>
		<li tag="560"><a href="index.html">参赛球队<br><span>TEAM</span></a></li>
		<li tag="700"><a href="index.html">商务合作<br><span>COOPERATION</span></a></li>
	</ul>
	<div class="mark"></div>
	</li>
</div>
```

index.html
```html
<div class="header">
	<div class="wrapper">
		<div class="topbar">
			<a class="logo" href="###"></a>
			<div class="login_status"><a class="p_center" href="###">个人中心</a> <a href="###">登陆</a> <a href="###">注册</a></div>
		</div>
		<link rel="import" href="static/widget/nav.html">
	</div>
</div>
```

result：
```html
<div class="header">
	<div class="wrapper">
		<div class="topbar">
			<a class="logo" href="###"></a>
			<div class="login_status"><a class="p_center" href="###">个人中心</a> <a href="###">登陆</a> <a href="###">注册</a></div>
		</div>
		<div class="nav">
			<ul>
				<li tag="0"><a href="index.html">首 页<br><span>HOME</span></a></li>
				<li tag="140"><a href="index.html">新闻公告<br><span>NEWS</span></a></li>
				<li tag="280"><a href="###">数据中心<br><span>DATA</span></a></li>
				<li tag="420"><a href="index.html">视频图集<br><span>VIDEO</span></a></li>
				<li tag="560"><a href="index.html">参赛球队<br><span>TEAM</span></a></li>
				<li tag="700"><a href="index.html">商务合作<br><span>COOPERATION</span></a></li>
			</ul>
			<div class="mark"></div>
			</li>
		</div>
	</div>
</div>
```

```js
var baseF="F:/code";//baseF="../code"
gulp.task('html', function() {
  var preLink = require('gulp-pre-link');
	return   gulp.src(config.htmlSrc)
	.pipe(preLink({baseUrl:baseF}))
	.pipe(gulp.dest(config.htmlDec));
});
```

* 2.3.2
  * fix bugs [bug](https://github.com/openks/gulp-pre-link/issues/4)
  * 修复bugs [bug](https://github.com/openks/gulp-pre-link/issues/4)
* 2.3.0
  * fix bugs [bug1](https://github.com/openks/gulp-pre-link/issues/1) and [bug2](https://github.com/openks/gulp-pre-link/issues/2)
  * 修复bugs [bug1](https://github.com/openks/gulp-pre-link/issues/1) 和 [bug2](https://github.com/openks/gulp-pre-link/issues/2)
* 2.2.0
  * add new parameter baseUrl if there is no this parameter,the path is based on the same with gulpfile.js
  * 新增参数 baseUrl 如果没有该参数则默认与gulpfile.js同级的相对路径
* 2.0.0
  * deal with link more than one fix bug that can only import one  link label, <link rel="import" href="a.html">
  * 修复上一版本一次只能引入一个<link rel="import" href="a.html">的bug
* 1.0.0
  * Initial release
