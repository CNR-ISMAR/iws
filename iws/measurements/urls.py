from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Measurements API')

from .views import write

urlpatterns = [
    url(r'^write$', write, name='measurements_write'),
    url(r'^api$', schema_view)
]
