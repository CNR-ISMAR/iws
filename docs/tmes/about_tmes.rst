About TMES
===============

The `transnational multi-model ensemble system (TMES)
<https://iws.seastorms.eu/tmes/>`_ combines the outcomes of existing ocean and wave forecasting systems, helping in improving the forecast accuracy and reliability on one hand and by adding indications on the forecast uncertainty (considered here as the ensemble spread) on the other hand.

Several operational ocean forecasting models are currently available for the Adriatic-Ionian region. Here we combined 17 forecasting systems, with 10 predicting sea level height (either storm surge or total water level) and 9 predicting wave characteristics. The general characteristics of the forecasting
systems are summarized in `Ferrarin et al., 2019 <https://www.nat-hazards-earth-syst-sci-discuss.net/nhess-2019-212/#discussion>`_. All numerical model results are interpolated, through a distance-weighted average remapping, on a common regular lat-lon grid covering the Adriatic-Ionian macro-region with a resolution of 0.02 deg. TMES produces results in terms of the ensemble mean and standard deviation, accounted for a measure of the forecast uncertainty.

The different operational models are forced at the surface boundary by several meteorological models (ECMWF, BOLAM, MOLOCH, COSMO, WFR and ALADIN) with horizontal resolution ranging from 16 to 1.4 km. The length of the ocean forecast is mostly related to the length of the meteorological forecast and varies from 1.5 to 10 days.
There is a large variability in the model's set-up in terms of spatial resolution, temporal frequency, spatial domain (Mediterranean Sea, Adriatic Sea, northern Adriatic Sea), grid arrangement (e.g. structured or unstructured) and data format (NetCDF, GRIB). Three of the considered systems (Kassandra, MED-Currents and Adriac) account for the current-wave coupling and two forecasting systems perform data assimilation of tide gauge observations in the operational chain (SIMMb and SIMMe).

TMES is implemented as an internal processing engine which interacts directly
with the Resource Layer to access the datasets (e.g. time series and forecasts)
and to deposit the processing results (e.g. ensemble model result, report,
statistics). Such outputs are available to the end-users and external portal
through the Common Data Sharing System and the Geoportal web interfaces.

For coastal flooding hazard purpose, the total sea level height must be forecasted.
Therefore, the astronomical tidal level values obtained by a specific SHYFEM
application over the Mediterranean Sea are added to the residual sea level simulated by the operational systems not accounting for the tide (SHYMED, ISSOS, SIMMb, SIMMe and MFS). The spread
among the operational simulations is expected to represent a measure of the
uncertainty of prediction and should be linked to the forecast error so that cases
with the largest spread are those with the highest uncertainty and where a large
error of the ensemble mean (and also of the deterministic forecast) is more
likely. TMES produces results in terms of the ensemble mean and standard deviation, 
accounted for a measure of the forecast
uncertainty.
