"use strict"

var config      = require('../config.json')
if(!config.tasks.images) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var path        = require('path')

var paths = {
  "src": path.join(config.tasks.sounds.src, '**/*.{' + config.tasks.sounds.extensions + '}'),
  "dest": config.tasks.sounds.dest
}

var soundsTask = function() {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)
}

gulp.task('sounds', soundsTask)

module.exports = soundsTask
