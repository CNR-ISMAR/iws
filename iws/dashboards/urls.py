from django.conf.urls import url
from .views import Dashboards

urlpatterns = [
    url(r'^$', Dashboards.as_view(), name='dashboards'),
]
