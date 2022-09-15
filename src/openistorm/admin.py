from django.contrib.gis import admin
from .favorites.models import Favorite
from .notifications.models import Notification
from .layers.models import ImageLayer
from .settings.models import Setting
from .models import FailedTask

admin.site.register(Favorite)
admin.site.register(Notification)
admin.site.register(ImageLayer)
admin.site.register(FailedTask)
admin.site.register(Setting)