from django.contrib import admin

from .models import Parameter, Sensor, Location, Serie, Measure, Network

class ParameterAdmin(admin.ModelAdmin):
    pass

class SensorAdmin(admin.ModelAdmin):
    pass

class LocationAdmin(admin.ModelAdmin):
    pass

class NetworkAdmin(admin.ModelAdmin):
    pass

class SerieAdmin(admin.ModelAdmin):
    pass

class MeasureAdmin(admin.ModelAdmin):
    pass


admin.site.register(Parameter, ParameterAdmin)
admin.site.register(Sensor, SensorAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Network, NetworkAdmin)
admin.site.register(Serie, SerieAdmin)
admin.site.register(Measure, MeasureAdmin)
