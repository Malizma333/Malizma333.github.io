from PIL import Image
import os, sys

if len(sys.argv) != 2:
  print('Bad number of arguments')
  exit()

f = sys.argv[1]
if os.path.isfile(f) and f[-3:] == 'png':
  f2 = os.path.join(f[:f.find('.png')] + '-cropped.png')
  img = Image.open(f)
  bbox = img.getbbox()
  if(bbox[2] < bbox[3]):
    avg = (bbox[3] - bbox[2]) / 2
    new_bbox = (0, avg, bbox[2], bbox[3] - avg)
  else:
    avg = (bbox[2] - bbox[3]) / 2
    new_bbox = (avg, 0, bbox[2] - avg, bbox[3])
  img2 = img.crop(new_bbox).resize((512,512), Image.Resampling.LANCZOS)
  img2.save(f2, optimize=True, quality=95)