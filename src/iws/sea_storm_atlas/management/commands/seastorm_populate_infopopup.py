from django.core.management.base import BaseCommand
from django.db import transaction

from geonode.layers.models import Dataset

EFFECTS_DS_NAME = 'sea_storm_atlas_effect_complete'

EFFECTS_FEATURE_INFO_TEMPLATE_HTML = '''
<p>
    <a title="${properties.coastalsegment_id}" href="/sea_storm_atlas/segments/${properties.coastalsegment_id}/" target="_blank" rel="noopener">Coastal Segment ${properties.coastalsegment_id}</a>
</p>
'''

COAST_DS_NAME = 'sea_storm_atlas_coastalsegment'

COAST_FEATURE_INFO_TEMPLATE_HTML = '''

'''

class Command(BaseCommand):
    '''
    This command applies a custom html feature info to the given dataset.

    The dataset MUST exist and have the same name ad declared above
    '''
    def handle(self, *args, **options):
        with transaction.atomic():
            ds = Dataset.objects.filter(name=EFFECTS_DS_NAME).first()

            if not ds:
                print(f'No dataset found with name {EFFECTS_DS_NAME}')
                return

            ds.use_featureinfo_custom_template = True
            ds.featureinfo_custom_template = EFFECTS_FEATURE_INFO_TEMPLATE_HTML
            ds.save()


            ds = Dataset.objects.filter(name=COAST_DS_NAME).first()

            if not ds:
                print(f'No dataset found with name {COAST_DS_NAME}')
                return

            ds.use_featureinfo_custom_template = True
            ds.featureinfo_custom_template = COAST_FEATURE_INFO_TEMPLATE_HTML
            ds.save()
