from django.core.management.base import BaseCommand
from django.db import transaction
from urllib2 import URLError

from iws.measurements.sources import syncvesk

class Command(BaseCommand):
    help = """
    """
    def handle(self, *args, **keywordargs):
        syncvesk()