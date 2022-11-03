from django.core.management import BaseCommand
from fcm_django.models import FCMDevice
from fcm_django.fcm import fcm_send_message


# The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):

    # Show this when the user types help
    help = "My test command"

    def handle(self, *args, **options):
        # devices = FCMDevice.objects.order_by('-pk').first()
        devices = FCMDevice.objects.all()

        # a = device.send_message("Title", "Message", api_key=None)
        # print(a)
        # a = device.send_message(data={"test": "test"})
        # print(a)
        a = devices.send_message(title="Title", body="Message", data={"test": "test"})
        # a = fcm_send_message(
        #     registration_id='e3QZ-TNB9KM:APA91bEHguI3e7yJak9a3ZYEwbJcqGup1vLDaNdNAUEO4qJh_OTQlp0oLiAehT9rRIeip-syVMN6kryey_xMF6DgRJuXjaFp5aX3kJulpLmpeMwM32NJeqPguXKq2wMr53W44fgTtYzB',
        #     title="Title",
        #     body="Message",
        #     data={"test": "test"},
        #     api_key="AAAA7ajwknU:APA91bFWWUavqkVcwcVDrvUNpHKLgCM4iZ01sWVZA8k2BVuDnFXJRkDCGTAE9L2sZ1xLyoPFLi7h_0s7-1ma3K1lNZq1eZdu4NuIxHw4Hh-U31sHwL1z8WfqVDJ7STWxLhsHGiMMab8W"
        # )

        # a = devices.send_message(
        #     title="Title", body="Message",
        #     data={"test": "test"},
        #     api_key='AAAA93Ube7g:APA91bHt09JDgBCPRaAuK5OWtarNmYKKz-nKPkHJPOvyszXISpyN43BxaGw6F9kcrbjhRzGGauFjhTyzcpiPkZhv_rtSusQU9V-OsFlmmF1WBU61yyXr6teQatUKrd8cuMu2j7FiQ3SM'
        # )
        print(a)


