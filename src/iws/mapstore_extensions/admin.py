from django.contrib import admin
from .models import MapstoreExtension

@admin.register(MapstoreExtension)
class MapstoreExtensionAdmin(admin.ModelAdmin):
  pass
