from django.contrib.gis import admin
from favorites.models import Favorite
from layers.models import ImageLayer
from notifications.models import Notification

admin.site.register(Favorite)
admin.site.register(ImageLayer)
admin.site.register(Notification)