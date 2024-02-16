from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404, render
from customer.models import Table, Customer
from customer.serializers import CustomerSerializer, TableSerializer
from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer
from food.models import Category
from food.serializers import CategorySerializer

@api_view(['GET'])
def HomePage(request, restaurant_id, table_id):
    if request.method == 'GET':
        table = get_object_or_404(Table, pk=table_id)
        restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
        categories = Category.objects.filter(restaurant=restaurant_id)
        
        if table is not None and restaurant is not None:
            if table.is_reserved is False:
                customer_serializer = CustomerSerializer(data=customer_data, partial=True)
                if customer_serializer.is_valid():
                    customer_serializer.save()
                customer_data = {
                    'restaurant': restaurant_id,
                    'name': 'Customer Restaurant '+str(restaurant_id)
                }
                CustomerSerializer(data=customer_data, partial=True)
            else:
                customer = Customer.objects.all().order_by('id').last()
                customer_serializer = CustomerSerializer(customer)
            table_data = {'is_reserved': True}
            table_serializer = TableSerializer(table, data=table_data, partial=True)
            if table_serializer.is_valid():
                table_serializer.save()
            restaurant_serializer = RestaurantSerializer(restaurant)
                    
            category_serializer = CategorySerializer(categories, many=True)
            request.session['restaurant'] = restaurant_serializer.data
            request.session['customer'] = customer_serializer.data
            
            return render(request, 'home.html', {
                'status': "success",
                'table': table_serializer.data,
                'restaurant': restaurant_serializer.data,
                'customer': customer_serializer.data,
                'categories': category_serializer.data
            })
        else: 
            return render(request, 'util/not_found.html', {
                'status': "error",
                "message": "Table or Restaurant Not Found"
            })
            
@api_view(['GET'])
def CartPage(request, restaurant_id, table_id):
    if request.method == 'GET':
        table = get_object_or_404(Table, pk=table_id)
        restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
        if table is not None and restaurant is not None:
            table_data = {'is_reserved': True}
            table_serializer = TableSerializer(table, data=table_data, partial=True)
            if table_serializer.is_valid():
                table_serializer.save()
            restaurant_serializer = RestaurantSerializer(restaurant)
                    
            return render(request, 'cart.html', {
                'status': "success",
                'table': table_serializer.data,
                'restaurant': restaurant_serializer.data,
            })
        else: 
            return render(request, 'util/not_found.html', {
                'status': "error",
                "message": "Table or Restaurant Not Found"
            })
        
@api_view(['GET'])
def CheckoutPage(request, restaurant_id, table_id):
    if request.method == 'GET':
        table = get_object_or_404(Table, pk=table_id)
        restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
        if table is not None and restaurant is not None:
            table_data = {'is_reserved': True}
            table_serializer = TableSerializer(table, data=table_data, partial=True)
            if table_serializer.is_valid():
                table_serializer.save()
            restaurant_serializer = RestaurantSerializer(restaurant)
                    
            return render(request, 'checkout.html', {
                'status': "success",
                'table': table_serializer.data,
                'restaurant': restaurant_serializer.data,
            })
        else: 
            return render(request, 'util/not_found.html', {
                'status': "error",
                "message": "Table or Restaurant Not Found"
            })
        