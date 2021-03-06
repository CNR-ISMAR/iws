from fcm_django.models import FCMDevice
from .serializers import NotificationSerializer
from .models import Notification


class FcmNotifyUser:
    def __init__(self, notification):
        notification = Notification.objects.get(pk=notification)
        print('FcmNotifyUser '+ notification.title)
        devices = FCMDevice.objects.filter(user=notification.user)
        notification = NotificationSerializer(notification).data
        devices.send_message(title=notification['title'], body=notification['description'], data=notification)

# devices = FCMDevice.objects.all()
#
# devices.send_message(title="Title", body="Message")
# devices.send_message(title="Title", body="Message", data={"test": "test"})
# devices.send_message(data={"test": "test"})