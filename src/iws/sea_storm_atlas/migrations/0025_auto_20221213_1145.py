# Generated by Django 3.2.16 on 2022-11-28 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0024_auto_20221205_1544'),
    ]

    operations = [
        migrations.RunSQL('''
            create or replace view sea_storm_atlas_coastalsegment_complete as
                select cs.id,
                    cs.region_id,
                    cs.subregion,
                    cs.geom,
                    cs.seg_name,
                    cs.code,
                    cs.partition,
                    cs.ews,
                    cs.ews_hazard_type,
                    cs.forecasting_service,
                    cs.cp_procedures,
                    cs.intervention_procedures,
                    cs.cf_risk_sources,
                    cs.network_for_marine_measurement_observation,
                    cs.post_event_monitoring_system,
                    count(ev.id) as events
                from sea_storm_atlas_coastalsegment cs
                left join sea_storm_atlas_stormevententry ev on cs.id = ev.coastalsegment_id
                group by cs.id
        ''', '')
    ]
