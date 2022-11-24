from django.core.management.base import BaseCommand
from django.db import transaction

from iws.sea_storm_atlas.models import StormEventEffect, StormEventEntry

class Command(BaseCommand):
    def handle(self, *args, **options):
        with transaction.atomic():
            StormEventEffect.objects.all().delete()
            StormEventEntry.objects.all().delete()
