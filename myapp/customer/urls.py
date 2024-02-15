from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TableViewSet, CustomerViewSet, ReservationViewSet

router = DefaultRouter()
router.register(r'table', TableViewSet)
router.register(r'customer', CustomerViewSet)
router.register(r'reservation', ReservationViewSet)

urlpatterns = [
    path('admin/', include(router.urls)),
]