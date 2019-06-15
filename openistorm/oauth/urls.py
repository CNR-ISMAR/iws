from django.conf.urls import url, include
import oauth2_provider.views as oauth2_views
from django.conf import settings
# from .views import ApiEndpoint
from django.contrib.auth import views as authViews
from oauth2_provider import views as oauthViews
# from django.urls import reverse_lazy
from .views import ProfileViewSet

app_name = 'oauth'

urlpatterns = [

    # url(r'^api/hello', ApiEndpoint.as_view()),  # an example resource endpoint
    #
    # # LOGIN / LOGOUT
    # url(r'^login/$', authViews.LoginView.as_view(template_name="djcore/oauth/login.html"), name='login'),
    # url(r'^logout/$', authViews.LogoutView.as_view(template_name="djcore/oauth/logout.html", next_page='/'), name='logout'),
    #
    # # RESET PASSWORD
    # url(r'^password_reset/done/$', authViews.PasswordResetDoneView.as_view(template_name="djcore/oauth/password_reset_done.html"), name='password_reset_done'),
    # url(r'^password_reset/$', authViews.PasswordResetView.as_view(template_name="djcore/oauth/password_reset.html", email_template_name="djcore/oauth/password_reset_email.html", success_url="done/"), name='password_reset'),
    # url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', authViews.PasswordResetConfirmView.as_view(template_name="djcore/oauth/password_reset_confirm.html", success_url = reverse_lazy('oauth:password_reset_complete')), name='password_reset_confirm'),
    # url(r'^reset/done/$', authViews.PasswordResetCompleteView.as_view(template_name="djcore/oauth/password_reset_complete.html"), name='password_reset_complete'),

    # OAUTH
    url(r'^authorize/', oauthViews.AuthorizationView.as_view(), name='authorize'),
    url(r'^token/$', oauthViews.TokenView.as_view(), name="token"),
    url(r'^revoke_token/$', oauthViews.RevokeTokenView.as_view(), name="revoke-token"),

    # # url(r'^applications/$', oauthViews.ApplicationList.as_view(), name="list"),
    # # url(r'^applications/(?P<pk>[\w-]+)/$', oauthViews.ApplicationDetail.as_view(), name="detail"),
    #
    # # PROFILE view & update
    url(r'^me/$', ProfileViewSet.as_view(), name="me"),
    #
    # # OAuth 2 endpoints:
    # # url(r'^o/', include(oauth2_endpoint_views, namespace="oauth2_provider")),

]

# router.register(r'users', UserViewSet)
# urlpatterns = router.urls
