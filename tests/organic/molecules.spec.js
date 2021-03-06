describe("Testing molecules", function() {

	var api = require('../../index.js')();

	it("should use size", function(done) {
		api.add({
			body: {
				size: 100,
				p: {
					size: '30/40'
				},
				section: {
					size: '/200px'
				}
			}
		}).compile(function(err, css) {
			expect(css).toBe('body{width: 100%;height: 100%;}body p{width: 30%;height: 40%;}body section{height: 200px;}');
			done();
		}, { minify: true})
	});

	it("should use cf", function(done) {
		api.add({
			body: {
				cf: 'all',
				p: {
					cf: 'before'
				},
				section: {
					cf: 'after'
				}
			}
		}).compile(function(err, css) {
			expect(css).toBe('body:before,body:after,body p:before,body section:after{content: " ";display: table;clear: both;}');
			done();
		}, { minify: true })
	});

	it("should use moveto", function(done) {
		api.add({
			p: {
				moveto: '10/20/30'
			}
		}).compile(function(err, css) {
			expect(css).toBe('p{transform: translate3d(10px,20px,30px);-webkit-transform: translate3d(10px,20px,30px);-ms-transform: translate3d(10px,20px,30px);}');
			done();
		}, { minify: true })
	});

	it("should use rotateto", function(done) {
		api.add({
			'.content': {
				rotateto: 25,
				section: {
					rotateto: '-30deg',
				},
				a: {
					rotateto: '10',
					moveto: '20/30'
				}
			}
		}).compile(function(err, css) {
			expect(css).toBe('.content{transform: rotate(25deg);-webkit-transform: rotate(25deg);-ms-transform: rotate(25deg);}.content section{transform: rotate(-30deg);-webkit-transform: rotate(-30deg);-ms-transform: rotate(-30deg);}.content a{transform: rotate(10deg) translate(20px,30px);-webkit-transform: rotate(10deg) translate(20px,30px);-ms-transform: rotate(10deg) translate(20px,30px);}');
			done();
		}, { minify: true })
	});

	it("should use scaleto", function(done) {
		api.add({
			p: {
				scaleto: '1.4/1.3',
				moveto: '30/0'
			}
		}).compile(function(err, css) {
			expect(css).toBe('p{transform: scale(1.4,1.3) translate(30px,0px);-webkit-transform: scale(1.4,1.3) translate(30px,0px);-ms-transform: scale(1.4,1.3) translate(30px,0px);}');
			done();
		}, { minify: true });
	});

	it("should use grid", function(done) {
		api.add({
			'section.container': {
				grid: '3/div'
			}
		}).compile(function(err, css) {
			expect(css).toBe('section.container:before,section.container:after{content: " ";display: table;clear: both;}section.container div{float: left;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;width: 33.33%;}');
			done();
		}, { minify: true });
	});

	it("should use transparent", function(done) {
		api.add({
			'section.container': {
				transparent: 0.4
			}
		}).compile(function(err, css) {
			expect(css).toBe('section.container{filter: alpha(opacity=40);-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);opacity: 0.4;-moz-opacity: 0.4;-khtml-opacity: 0.4;}');
			done();
		}, { minify: true });
	});

});