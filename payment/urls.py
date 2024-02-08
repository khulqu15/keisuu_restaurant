from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, FoodOrderViewSet, OrderItemViewSet

router = DefaultRouter()
router.register(r'payments', PaymentViewSet)
router.register(r'food_orders', FoodOrderViewSet)
router.register(r'order_items', OrderItemViewSet)

urlpatterns = [
    path('admin/', include(router.urls)),
]