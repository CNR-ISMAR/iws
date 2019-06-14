from django.contrib import admin

from .models import CoastalSegment, StormEvent, Sea

class CoastalSegmentAdmin(admin.ModelAdmin):
    list_display = ('code', 'partition','subregion')
    
    
class StormEventAdmin(admin.ModelAdmin):
    
    list_display = ('date_start','area_code', 'area_partition')
    list_filter = ['area_code', 'date_start']
    
    pass


class SeaAdmin(admin.ModelAdmin):
    pass


admin.site.register(CoastalSegment, CoastalSegmentAdmin)
admin.site.register(StormEvent, StormEventAdmin)
admin.site.register(Sea, SeaAdmin)
