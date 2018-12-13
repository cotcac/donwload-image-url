var download = require('download-file')
var path = require('path');
var shortid = require('shortid'); // unique file name
var resize = require('im-resize');
var fs = require('fs'); //this come along with node.
var im = require('imagemagick');


module.exports = function(body, callback) {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var year = dateObj.getUTCFullYear();
  var timeDir = year + '/' + month + '/';
  if (!body) return callback('url not found', null); // check the url exist.
  var newName = shortid.generate();
  var options = {
    directory: "./public/images/" + timeDir,
    filename: newName + '.jpg'
  }
  download(body.url, options, function(err) {
    if (err) return callback(err, null);
    var path_file = options.directory + options.filename;
    fs.readFile(path_file, function(err, myfile) {
      if (err) return callback(err, null);
      im.identify(path_file, function(err, data) {
        if (err) return callback(err, null);
        resizefn(path_file, data.width, data.height);
      })
    })

    function resizefn(path_file, width, height) {
      var image = {
        path: path_file,
        width: width,
        height: height
      };
      var output = {
        versions: [{
          suffix: '_thumb',
          maxHeight: body.height,
          maxWidth: body.width,
          aspect: body.aspect,
        }]
      };
      resize(image, output, function(error, versions) {
        if (error) return callback(error, null);
        var thumbnail = '/images/' + timeDir + newName + '_thumb.' + 'jpg';
        var thumbnail_original = './public/images/' + timeDir + newName + '.jpg';
        fs.unlink(thumbnail_original, (err) => {
           if (err) console.log(err);
         });
         callback(null, thumbnail);
      });
    }
  })
}
