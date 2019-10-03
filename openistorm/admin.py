from django.contrib.gis import admin
from favorites.models import Favorite
from layers.models import ImageLayer
from settings.models import Setting
from notifications.models import Notification
from devices.models import Device
from models import FailedTask

admin.site.register(Favorite)
admin.site.register(ImageLayer)
admin.site.register(Notification)
admin.site.register(FailedTask)
admin.site.register(Setting)
admin.site.register(Device)