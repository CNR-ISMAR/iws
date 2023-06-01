from django.conf.urls import url
from .views import StormEventListGeoJson, StormEventList


app_name = 'stormevents'

urlpatterns = [
    url(r'^geojson$', StormEventListGeoJson.as_view(), name="geojson"),
    url(r'^$', StormEventList.as_view(), name="list"),
]