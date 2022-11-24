from django.core.management.base import BaseCommand

from django.db import transaction
from iws.sea_storm_atlas.models import DamageCategory, StormEventEffect, StormEventEntry, StormEvent, Origin


class Command(BaseCommand):
    def handle(self, *args, **options):
        with transaction.atomic():
            for event in StormEvent.objects.all():
                entry = StormEventEntry.objects.create(
                    date_start=event.date_start,
                    date_end=event.date_end,
                    is_aggregated=event.is_aggregated,
                    coastalsegment=event.coastalsegment,
                    description=event.comments,
                )

                if event.origin:
                    origins = [ o.lower().replace('?', '') for o in event.origin.split(',')]
                    for o in origins:
                        origin, _ = Origin.objects.get_or_create(name=o)
                        entry.origins.add(origin)

                for count in range(0, event.evts_total):
                    effect = StormEventEffect.objects.create(
                        geom=event.geom,
                        event=entry,
                        date=entry.date_start,
                        flooding_level=event.flooding_level,
                    )

                    if event.evts_coast_erosion and count < event.evts_coast_erosion:
                        d, _ = DamageCategory.objects.get_or_create(name='Coast Erosion')
                        effect.damage_categories.add(d)

                    if event.evts_flooding and count < event.evts_flooding:
                        d, _ = DamageCategory.objects.get_or_create(name='Flooding')
                        effect.damage_categories.add(d)

                    if event.evts_defence_damage and count < event.evts_defence_damage:
                        d, _ = DamageCategory.objects.get_or_create(name='Defence')
                        effect.damage_categories.add(d)

                    if event.evts_infrastructure_damage and count < event.evts_infrastructure_damage:
                        d, _ = DamageCategory.objects.get_or_create(name='Infrastructure')
                        effect.damage_categories.add(d)

                    if event.evts_businesses_damage and count < event.evts_businesses_damage:
                        d, _ = DamageCategory.objects.get_or_create(name='Business')
                        effect.damage_categories.add(d)