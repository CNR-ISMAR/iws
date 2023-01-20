from .models import MapstoreExtension

def mapstore_extensions(*args, **kwargs):
    return {
      'MAPSTORE_EXTENSIONS': MapstoreExtension.objects.filter(enabled=True) 
    }