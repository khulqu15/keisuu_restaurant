from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestaurantViewSet, RestaurantStaffViewSet, KitchenStaffViewSet

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'restaurants_staff', RestaurantStaffViewSet)
router.register(r'kitchen_staff', KitchenStaffViewSet)

urlpatterns = [
    path('admin/', include(router.urls)),
]