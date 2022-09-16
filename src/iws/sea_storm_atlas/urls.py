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

from django.views.generic import TemplateView, RedirectView
from django.urls import path
from django.conf import settings

from . import views
from .views import CoastalSegmentListView


urlpatterns = (
	path('map/', RedirectView.as_view(url= f'/catalogue/#/map/{settings.STORM_ATLAS_MAP_ID}'), name='atlas_map'),
	path('storm_events/', TemplateView.as_view(template_name='sea_storm_atlas/events_sea_storm.html'), name='storm_events'),
	path('segment/list/', CoastalSegmentListView.as_view(), name='segment-list'),
    #     url(r'^segment/listnew$', TemplateView.as_view(template_name='sea_storm_atlas/coastalsegment_list.html'), name='storm_events'),
	path('segment/<int:pk>/', views.CoastalSegmentDetailView.as_view(), name='segment-detail'),
    # path('segments/<segid:int>/edit/', map_edit, name='segment_edit'),
    path('event/list/segment/<int:segid>/', views.StormEventListView.as_view(),  name='event-list'),
    path('^event/<int:pk>/', views.StormEventDetailView.as_view(), name='event-detail'),
)

