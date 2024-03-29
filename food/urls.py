from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoodViewSet, CategoryViewSet, TranslationViewSet, RequestNewCustomer, DeleteEndedCustomer, SetTableAvailable, GetTable, GetAllOrder, GetAllFoods, GetAFood, RequestOrder, RequestFood, GetAnOrder, CreatePayment, PaidPayment, SetStatusOrder, SetStatusFood

router = DefaultRouter()
router.register(r'food', FoodViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'translation', TranslationViewSet)

urlpatterns = [
    path('admin/', include(router.urls)),
    path('<int:restaurant_id>/table/<int:table_id>/', GetTable),
    path('<int:restaurant_id>/table/<int:table_id>/done/', SetTableAvailable),
    path('<int:restaurant_id>/customer/', RequestNewCustomer),
    path('<int:restaurant_id>/customer/<int:customer_id>/end/', DeleteEndedCustomer),
    path('<int:restaurant_id>/foods/home/', GetAllFoods),
    path('<int:restaurant_id>/foods/<int:food_id>/', GetAFood),
    path('<int:restaurant_id>/foods/order/', RequestOrder, name='submitCart'),
    path('<int:restaurant_id>/foods/order/<int:food_id>/', RequestFood),
    path('<int:restaurant_id>/foods/order/<int:order_id>/', GetAnOrder),
    path('<int:restaurant_id>/foods/pay/<int:order_id>/', CreatePayment),
    path('<int:restaurant_id>/foods/paid/<int:payment_id>/', PaidPayment),
    
    path('<int:restaurant_id>/chef/orders/', GetAllOrder),
    path('<int:restaurant_id>/chef/order/<int:order_id>/', SetStatusOrder),
    path('<int:restaurant_id>/chef/food/<int:item_id>/', SetStatusFood),
]