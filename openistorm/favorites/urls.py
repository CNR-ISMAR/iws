from django.conf.urls import url
from rest_framework import routers
from views import FavoriteList, FavoriteListGeoJson, FavoriteDetail


app_name = 'favorites'

router = routers.SimpleRouter()
router.register(r'', FavoriteDetail)
# router.register(r'', FavoriteDetail)

urlpatterns = router.urls + [
    url(r'^geojson$', FavoriteListGeoJson.as_view(), name="geojson"),
    url(r'^$', FavoriteList.as_view(), name="list"),
]