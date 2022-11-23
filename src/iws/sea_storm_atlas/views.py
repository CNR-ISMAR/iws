from django.shortcuts import render


def index(request):
  return render(request, 'sea_storm_atlas/app.html')
