from django.urls import path
from .views import write

urlpatterns = [
    path('write', write, name='measurements_write'),
]
