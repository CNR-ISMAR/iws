from django.core.management import BaseCommand
from openistorm.layers.utils import ThresholdsExceed


# The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):

    # Show this when the user types help
    help = "My test command"

    def handle(self, *args, **options):
        th = ThresholdsExceed()
        print('TEST')
        return None