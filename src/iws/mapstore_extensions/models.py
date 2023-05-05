from django.db import models
import json
from django.utils.safestring import mark_safe


class MapstoreExtension(models.Model):
  name = models.CharField(max_length=250, unique=True)
  resources = models.ManyToManyField('maps.Map', blank=True)
  enabled = models.BooleanField(default=False)

  def __str__(self):
    return self.name

  def as_ids_list(self):
    return ','.join(f'"{e}"' for e in self.resources.all().values_list('id', flat=True))

  def as_json_config(self):
    return mark_safe(json.dumps({
      "name": self.name,
      "cfg": {
        "disablePluginIf": f"{{ ![{self.as_ids_list()}].includes(state('gnId')) }}"
      }
    }))
