from django.conf.urls import url
from .views import StationList


app_name = 'stations'

urlpatterns = [
    url(r'', StationList.as_view(), name="stations"),
]