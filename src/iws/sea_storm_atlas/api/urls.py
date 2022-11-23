from dynamic_rest.routers import DynamicRouter
from . import views

router = DynamicRouter()
router.register(f'sea', views.SeaViewSet, 'sea')
router.register(f'origin', views.OriginViewSet, 'origin')
router.register(f'damagecategory', views.DamageCategoryViewSet, 'damagecategory')
router.register(f'stormevent', views.StormEventViewSet, 'stormevent')
router.register(f'stormeffect', views.StormEffectViewSet, 'stormeffect')
router.register(f'coastalsegment', views.CoastalSegmentViewSet, 'coastalsegment')

urlpatterns = router.urls
