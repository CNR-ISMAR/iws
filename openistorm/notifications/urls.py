from django.conf.urls import url
from rest_framework import routers
from views import NotificationList, NotificationDetail


app_name = 'notification'

router = routers.SimpleRouter()
router.register(r'', NotificationDetail)
# router.register(r'', NotificationDetail)

urlpatterns = router.urls + [
    url(r'^$', NotificationList.as_view(), name="list"),
]