from django.urls import re_path
from . import views

urlpatterns = (
    re_path('map/', views.redirect_to_map, name="redirect_to_storm_atlas_map"),
    re_path('.*', views.index, name="sea_storm_atlas"),
)
