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

from django.conf.urls import patterns, url, include
from django.views.generic import TemplateView, RedirectView
from geonode.urls import urlpatterns
from iws.measurements.grafana_proxy import GraphanaProxyView


urlpatterns += (
## include your urls here
    #pinaxnotifications
    url(r"^notifications/", include("pinax.notifications.urls", namespace="pinax_notifications")),
    # invitations
    url(r'invitations/', include ('invitations.urls')),
    #sea storm atlas
    url(r'^sea_storm_atlas/', include('iws.sea_storm_atlas.urls')),
    #url(r'^sea_storm_atlas/', RedirectView.as_view(url= '/maps/165/view', permanent=True), name='sea_storm_atlas'),
    #url(r'^sea_storm_atlas/', TemplateView.as_view(template_name='maps_sea_storm.html'), name='atlas_map'),

    #measurements
    url(r'measurements/', include ('iws.measurements.urls')),
    # url(r'^grafana/(?P<path>.*)$', GraphanaProxyView.as_view(), name='graphana-dashboards'),

    #tmes
    url(r'tmes/', include('iws.tmes.urls')),
)

urlpatterns = patterns('',
   url(r'^/?$',
       TemplateView.as_view(template_name='site_index.html'),
       name='home'),
 ) + urlpatterns
