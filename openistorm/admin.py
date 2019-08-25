from django.contrib.gis import admin
from favorites.models import Favorite
from layers.models import ImageLayer

admin.site.register(Favorite)
admin.site.register(ImageLayer)