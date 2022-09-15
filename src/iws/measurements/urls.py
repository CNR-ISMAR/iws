from rest_framework_swagger.views import get_swagger_view
from django.urls import path

schema_view = get_swagger_view(title='Measurements API')

from .views import write

urlpatterns = [
    path('write', write, name='measurements_write'),
    path('api', schema_view)
]
