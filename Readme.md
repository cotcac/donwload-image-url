# Install
```
npm i download-image-url
```

# Source

(https://github.com/cotcac/download-image-url)

# Description

Give me an image url, width, high and aspect. I will download it to your server and return the location path.
The process may take time so we use callback.

Image will be download to your public/images directory.
To organize current year and month will be the sub directory.
directory
public/images/year/month/fileName_thumb.jpg

# Example

```
const dli = require('../download-image-url');
router.get('/download', function(req, res){
  let img = {
    url: 'https://www.tranvuong.com/static/me.jpg',
    height: 180,
    width: 150,
    aspect:'180:150 !v' // use v or h to force the ratio aspect.
  }
  dli(img, function(err, data){
    if(err) return res.json(err);
    res.send(data);///images/2018/12/OldEW9I0c_thumb.jpg
  })
})
```
