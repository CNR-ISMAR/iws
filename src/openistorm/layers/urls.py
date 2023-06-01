from django.conf.urls import url
from .views import ImageLayerList, ImageLayerBoundaries, Info, TimeSeries, SeaLevelMixMax, MobileTimeSeries#, Stations


app_name = 'imagelayers'

urlpatterns = [
#    url(r'<str:dataset>/boundaries', ImageLayerBoundaries.as_view(), name="boundaries"),
#    url(r'<str:dataset>', ImageLayerList.as_view(), name="list"), # ?from=datetime&to=datetime
    url(r'info', Info.as_view(), name="info"),
    url(r'mobile-timeseries', MobileTimeSeries.as_view(), name="mobile-timeseries"),
    url(r'timeseries', TimeSeries.as_view(), name="timeseries"),
    url(r'boundaries', ImageLayerBoundaries.as_view(), name="boundaries"),
    url(r'sea_level_min_max', SeaLevelMixMax.as_view(), name="sea_level_min_max"),
    url(r'', ImageLayerList.as_view(), name="list"), # ?from=datetime&to=datetime
]