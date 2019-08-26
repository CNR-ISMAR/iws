from PIL import Image
import json


class NCToImg:
  # def __init__(self, input_file, output_name):
  #   self.input_file = input_file
  #   self.output_name = output_name

  def generate_image_and_meta_from_json(self, input_file, output_name):
    # input_file = self.input_file
    # output_name = self.output_name

    with open(input_file) as json_file:
      data = json.load(json_file)

    u, v = data[0], data[1]
    u['data'] = self.normalize_data(u['data'])
    v['data'] = self.normalize_data(v['data'])
    u['min'] = self.min(u['data'])
    v['min'] = self.min(v['data'])
    u['max'] = self.max(u['data'])
    v['max'] = self.max(v['data'])

    width, height = u['header']['nx'], u['header']['ny']

    pngData = []
    for y in range(0, height):
      for x in range(0, width):
        k = (y * width) + x
        if u['data'][k] is not None and v['data'][k] is not None:
          pngData.append((
            int(255 * (u['data'][k] - u['min']) / (u['max'] - u['min'])),
            int(255 * (v['data'][k] - v['min']) / (v['max'] - v['min'])),
            0,
            255,
          ))
        else:
          pngData.append((255, 255, 255, 0))
    pngData = tuple(pngData)

    image = Image.new('RGBA', (width, height))
    image.putdata(pngData)
    image.save(output_name + ".png", "PNG")

    json_data = {
      "source": "https://iws.ismar.cnr.it/",
      "date": u['header']['refTime'],
      "width": width,
      "height": height,

      "max_x": v['max'],
      "max_y": u['max'],
      "min_x": v['min'],
      "min_y": u['min'],

      "resolution": 1024,
      "error": False
    }

    with open(output_name + ".json", 'w') as outfile:
      json.dump(json_data, outfile, indent=2)

  def normalize_data(self, data):
    return list(map(lambda x: None if x == 'NaN' else x, data))

  def min(self, data):
    return min(x for x in data if x is not None)

  def max(self, data):
    return max(x for x in data if x is not None)


# ciao = NCToImg('./TMES_waves_20190823-010000.json', 'py')
# ciao.generate_image_and_meta_from_json()
ciao = NCToImg()
ciao.generate_image_and_meta_from_json('./TMES_waves_20190823-010000.json', 'py')
