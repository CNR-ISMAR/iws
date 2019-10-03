# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
# Copyright (C) 2019 CNR ISMAR Amedeo Fadini
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

from . import views
from .models import CoastalSegment, StormEvent, Sea
from .views import CoastalSegmentListView, CoastalSegmentDetailView,StormEventListView, StormEventDetailView

urlpatterns = (
	## include your urls here
	url(r'^map$', RedirectView.as_view(url= '/maps/165/view', permanent=True), name='atlas_map'),
	url(r'^atlas$', TemplateView.as_view(template_name='sea_storm_atlas/map_sea_storm.html'), {'mapid':'165'}, name='atlas_map_test'),
	url(r'^storm_events$', TemplateView.as_view(template_name='sea_storm_atlas/events_sea_storm.html'), name='storm_events'),
	url(r'^segment/list$', CoastalSegmentListView.as_view(), name='segment-list'),
        url(r'^segment/listnew$', TemplateView.as_view(template_name='sea_storm_atlas/coastalsegment_list.html'), name='storm_events'),
	url(r'^segment/(?P<pk>\d+)', views.CoastalSegmentDetailView.as_view(), name='segment-detail'),
    #url(r'^(segments/?P<segid>[^/]+)/edit$', map_edit, name='segment_edit'),
    url(r'^event/list/segment/(?P<segid>\d+)', views.StormEventListView.as_view(),  name='event-list' ),
    
    url(r'^event/(?P<pk>\d+)', views.StormEventDetailView.as_view(), name='event-detail'),


)

