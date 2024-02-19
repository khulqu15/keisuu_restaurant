"""
URL configuration for order project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.static import serve
from django.conf.urls import url
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('restaurant/<int:restaurant_id>/table/<int:table_id>', views.HomePage, name='home'),
    path('restaurant/<int:restaurant_id>/table/<int:table_id>/cart', views.CartPage, name='cart'),
    path('restaurant/<int:restaurant_id>/table/<int:table_id>/checkout', views.CheckoutPage, name='checkout'),
    
    path('restaurant/<int:restaurant_id>/kitchen', views.CashierPage, name='kitchen'),
    
    path('admin/', include('order.admin_urls')),
    
    path("admin/", admin.site.urls),
    path('api/', include('customer.urls')),
    path('api/', include('restaurant.urls')),
    path('api/', include('food.urls')),
    path('api/', include('payment.urls')),
    
] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
