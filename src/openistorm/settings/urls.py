from django.conf.urls import url
from rest_framework import routers
from .views import SettingList


app_name = 'settings'

router = routers.SimpleRouter()

urlpatterns = router.urls + [
    url(r'^$', SettingList.as_view(), name="get_or_update"),
]