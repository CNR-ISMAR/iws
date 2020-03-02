from django.conf.urls import url
from .views import TmesIndex

urlpatterns = [
    url(r'^$', TmesIndex.as_view(), name='tmes_index'),
]
