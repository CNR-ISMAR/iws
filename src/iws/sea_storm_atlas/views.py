from django.shortcuts import render, redirect

from .models import SeaStormAtlasConfiguration

def index(request):
  return render(request, 'sea_storm_atlas/app.html')


def redirect_to_map(request):
  conf = SeaStormAtlasConfiguration.objects.get()
  return redirect(f'/catalogue/#/map/{conf.map}')
