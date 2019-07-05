from django.conf.urls import url
from oauth2_provider import views as oauthViews
from views import FavoriteList
from django.views.decorators.csrf import csrf_exempt


app_name = 'favorites'

urlpatterns = [
    url(r'', FavoriteList.as_view(), name="list"),
]