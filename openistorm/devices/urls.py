from django.conf.urls import url
from rest_framework import routers
from views import DeviceList, DeviceListGeoJson, DeviceDetail


app_name = 'devices'

router = routers.SimpleRouter()
router.register(r'', DeviceDetail)
# router.register(r'', DeviceDetail)

urlpatterns = router.urls + [
    url(r'^$', DeviceList.as_view(), name="list"),
]