from rest_framework.response import Response
from rest_framework.generics import  GenericAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize
import json


# name: wawes / sea_level_avg sea_level_std
# timestamp: timestamp hourly
# format: json / png



# class JsonNC(GenericAPIView):
#     def get(self, *args, **kwargs):
#         file_path = os.path.join(settings.MEDIA_ROOT, path)
#         if os.path.exists(file_path):
#             with open(file_path, 'rb') as fh:
#                 response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
#                 response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
#                 return response
#         raise Http404
#
#
#




