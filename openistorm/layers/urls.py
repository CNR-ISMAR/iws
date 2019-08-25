from django.conf.urls import url
from views import ImageLayerList, ImageLayerBoundaries


app_name = 'imagelayers'

urlpatterns = [
#    url(r'<str:dataset>/boundaries', ImageLayerBoundaries.as_view(), name="boundaries"),
#    url(r'<str:dataset>', ImageLayerList.as_view(), name="list"), # ?from=datetime&to=datetime
    url(r'boundaries', ImageLayerBoundaries.as_view(), name="boundaries"),
    url(r'', ImageLayerList.as_view(), name="list"), # ?from=datetime&to=datetime
]