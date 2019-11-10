from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView
from django.views.decorators.clickjacking import xframe_options_exempt
from django.utils.decorators import method_decorator


#@xframe_options_exempt
class Dashboards(TemplateView):


    template_name = 'dashboards/dashboards.html'
    @method_decorator(xframe_options_exempt)
    def dispatch(self, *args, **kwargs):
        return super(Dashboards, self).dispatch(*args, **kwargs)

#def dashboards(request):
#    template = loader.get_template('dashboards.html')
#    return HttpResponse(template.render(request))

