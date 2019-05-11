from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class TmesIndex(TemplateView):

    template_name = 'tmes/index.html'
