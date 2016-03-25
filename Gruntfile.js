module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//压缩
		uglify:{
			//“options”中规定允许生成的压缩文件带banner，即在生成的压缩文件第一行加一句话说明。
			options:{
				stripBanners:true,
				banner:'/*! <%-pkg.name%>-<%-pkg.version%>.js */\n'
			},
			//“build”中配置了源文件和目标文件。
			build:{
				src:'build/all.js',
				// dest:'build/<%-pkg.name%>-<%-pkg.version%>.min.js'
				dest:'build/all.min.js'
			}
		},

		jshint:{
			//“build”中描述了jshint要检查哪些js文档的语法。
			build:['Gruntfile.js','src/*.js'],
			//“options”中描述了要通过怎么的规则检查语法，这些规则的描述文件就保存在网站根目录下的一个叫做“.jshintrc”的文件中。
			options:{
				jshintrc:'.jshintrc'
			}
		},
		csslint:{
			build:['src/*.css'],
			options:{
				csslintrc:'csslintrc.json'
			}
		},
		concat:{
			options:{
				separator:';',
				stripBanners:true,
				banner:'/*! <%-pkg.name%>-<%-pkg.version%> -2016-2-17*/\n'
			},
			dist:{
				src:['src/*.js'],
				dest:'build/all.js',
			}
		},
		watch:{
			build:{
				files:['src/*.js','src/*.css'],
				tasks:['jshint','uglify'],
				options:{spawn:false}
			}
		}
	});

	//告诉grunt导入插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//告诉grunt执行什么内容
	// grunt.registerTask('default',['jshint','uglify','watch']);
	grunt.registerTask('default',['jshint','concat','uglify','csslint','watch']);
};

