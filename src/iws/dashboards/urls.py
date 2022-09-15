from django.urls import path
from .views import Dashboards

urlpatterns = [
    path('', Dashboards.as_view(), name='dashboards'),
]
