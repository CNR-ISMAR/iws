from django.contrib.gis import admin
from favorites.models import Favorite
from layers.models import ImageLayer
from notifications.models import Notification
from models import FailedTask

admin.site.register(Favorite)
admin.site.register(ImageLayer)
admin.site.register(Notification)
admin.site.register(FailedTask)