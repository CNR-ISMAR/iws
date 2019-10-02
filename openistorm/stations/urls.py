from django.conf.urls import url
from views import Stations


app_name = 'stations'

urlpatterns = [
    url(r'', Stations.as_view(), name="stations"),
]