from django.shortcuts import render, get_object_or_404
from django.views import generic
from .models import CoastalSegment, StormEvent, Sea
# Create your views here.

class CoastalSegmentListView(generic.ListView):
    
    model = CoastalSegment
    
    ordering = ['code', 'partition']
    
    
class CoastalSegmentDetailView(generic.DetailView):
    
    model = CoastalSegment
    
    def get_context_data(self, **kwargs):
        # Call the base implementation first to get the context
        context = super(CoastalSegmentDetailView, self).get_context_data(**kwargs)
        # Create any data and add it to the context
        context['some_data'] = 'This is just some data'
        return context

class StormEventListView(generic.ListView):
    
    model = StormEvent
    #paginate_by = 25
    ordering = ['date_start']
    #segment = request.GET.get('segment', 'all')
    #queryset = StormEvent.objects.filter(coastalsegment_id=request.pk)
    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(StormEventListView, self).get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        #context['event_list'] = StormEvent.objects.all()
        return context
    
    def get_queryset(self):

        return StormEvent.objects.order_by('-date_start').filter(coastalsegment_id=self.kwargs["segid"])    
    
    
class StormEventDetailView(generic.DetailView):
    
    model = StormEvent
    
