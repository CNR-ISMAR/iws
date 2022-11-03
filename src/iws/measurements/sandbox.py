from iws.measurements.models import *


p = Parameter.objects.get(label='SLEV')
series = Serie.objects.filter(parameter=p)
for s in series:
    # .filter(location__label='Itea'):
    s.set_mean(threshold=1)
