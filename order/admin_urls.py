from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('<int:restaurant_id>/', views.AdminPage.home, name='admin_home'),
    path('<int:restaurant_id>/staffs/', views.AdminPage.staff, name='admin_staff'),
    path('<int:restaurant_id>/foods/', views.AdminPage.food, name='admin_food'),
]