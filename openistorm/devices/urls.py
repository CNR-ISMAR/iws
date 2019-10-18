from django.conf.urls import url
from rest_framework import routers
from views import DeviceList


app_name = 'devices'

router = routers.SimpleRouter()

urlpatterns = router.urls + [
    url(r'^$', DeviceList.as_view({'post': 'create'}), name="list"),
]