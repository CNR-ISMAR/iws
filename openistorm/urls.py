from django.conf.urls import url, include
import oauth2_provider.views as oauth2_views
from django.conf import settings
# from .views import ApiEndpoint
from django.contrib.auth import views as authViews
from oauth2_provider import views as oauthViews
# from django.urls import reverse_lazy
# from .views import ProfileViewSet

# app_name = 'oauth'

urlpatterns = [
    url(r'oauth/', include('openistorm.oauth.urls')),
    url(r'favorites/', include('openistorm.favorites.urls')),
    url(r'imagelayers/', include('openistorm.layers.urls')),
]

# router.register(r'users', UserViewSet)
# urlpatterns = router.urls
