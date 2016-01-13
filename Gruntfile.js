'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/app.css': 'src/scss/app.scss'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['src/index.html'], dest: 'dist/index.html'
                    },
                    {
                        cwd: 'src/fonts/',
                        expand: true,
                        src: ['**'],
                        dest: 'dist/fonts/',

                    },
                    {
                        cwd: 'src/img/',
                        expand: true,
                        src: ['**'],
                        dest: 'dist/img/',

                    },
                    {
                        cwd: 'src/js/views/',
                        expand: true,
                        src: ['**'],
                        dest: 'dist/views/',

                    }
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['node_modules/angular/angular.min.js', 'node_modules/angular-ui-router/build/angular-ui-router.min.js', 'src/js/**', '!src/js/views/**'],
                dest: 'dist/js/app.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/**', 'Gruntfile.js'],
                tasks: ['build'],
            },
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }
    });
    grunt.registerTask('build', ['sass', 'concat', 'copy', 'gh-pages']);
};
