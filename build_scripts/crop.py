from PIL import Image
import os

directory = 'assets'
for filename in os.listdir(directory):
  f = os.path.join(directory, filename)
  if os.path.isfile(f) and f[-3:] == 'png' and 'cropped' not in f:
    f2 = os.path.join(directory, f[f.find('\\') + 1:f.find('.png')] + '-cropped.png')
    img = Image.open(f)
    bbox = img.getbbox()
    if(bbox[2] < bbox[3]):
      avg = (bbox[3] - bbox[2]) / 2
      new_bbox = (0, avg, bbox[2], bbox[3] - avg)
    else:
      avg = (bbox[2] - bbox[3]) / 2
      new_bbox = (avg, 0, bbox[2] - avg, bbox[3])
    img2 = img.crop(new_bbox).resize((256,256), Image.ANTIALIAS)
    img2.save(f2, optimize=True, quality=95)