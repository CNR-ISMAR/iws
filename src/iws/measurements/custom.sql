drop view measurements_measure_view;
create view measurements_measure_view as
select mm.id,
       mm.timestamp,
       mm.value,
       mm.value - coalesce(ms.stats_mean, 1) as value_norm,
       ml.label as location,
       mp.label as parameter,
       mn.label as network
   from measurements_measure mm
   left join measurements_serie ms on(mm.serie_id=ms.id)
   left join measurements_parameter mp on (ms.parameter_id=mp.id)
   left join measurements_location ml on(ms.location_id=ml.id)
   left join measurements_network mn on(ms.network_id=mn.id);
grant SELECT on measurements_measure_view to grafana ;
