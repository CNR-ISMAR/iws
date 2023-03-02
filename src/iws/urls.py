# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################

from django.conf.urls import include, re_path
from geonode.urls import path, urlpatterns

# from iws.measurements.grafana_proxy import GraphanaProxyView

urlpatterns += (
## include your urls here
    # Oauth2 views
    path('', include('openistorm.urls')),
    #pinaxnotifications
    # url(r"^notifications/", include("pinax.notifications.urls", namespace="pinax_notifications")),
    # invitations
    # url(r'invitations/', include ('invitations.urls')),
    #sea storm atlas
    path('sea_storm_atlas/', include('iws.sea_storm_atlas.urls')),
    #url(r'^sea_storm_atlas/', RedirectView.as_view(url= '/maps/165/view', permanent=True), name='sea_storm_atlas'),
    #url(r'^sea_storm_atlas/', TemplateView.as_view(template_name='maps_sea_storm.html'), name='atlas_map'),

    #measurements
    path('measurements/', include ('iws.measurements.urls')),
    path('dashboards/', include('iws.dashboards.urls')),
    #tmes
    path('tmes/', include('iws.tmes.urls')),
    # url(r'grappelli/', include('grappelli.urls')),
    re_path("^api/v2/", include('iws.sea_storm_atlas.api.urls')),
)
