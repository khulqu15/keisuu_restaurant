from django.shortcuts import get_object_or_404, render, HttpResponse
from django.db.models import Sum, F
from rest_framework.response import Response
from rest_framework.decorators import api_view
from customer.models import Table, Customer
from customer.serializers import CustomerSerializer, TableSerializer
from restaurant.models import Restaurant, RestaurantStaff
from restaurant.serializers import RestaurantSerializer, RestaurantStaffSerializer
from food.models import Category, Food
from food.serializers import CategorySerializer, FoodSerializer
from payment.serializers import FoodOrderSerializer
from payment.models import FoodOrder

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
        
def CashierPage(request, restaurant_id):
    if request.method == 'GET':
        orders = FoodOrder.objects.filter(table__restaurant_id=restaurant_id)
        serializer = FoodOrderSerializer(orders, many=True)
        return render(request, 'chef/order.html', {
            'status': 'success',
            'orders': serializer.data
        })
        
class AdminPage:
    def home(request, restaurant_id):
        if request.method == 'GET':
            foods = Food.objects.filter(category__restaurant_id=restaurant_id)
            categories = Category.objects.filter(restaurant_id=restaurant_id)
            orders = FoodOrder.objects.filter(table__restaurant_id=restaurant_id).annotate(
                total=Sum('order_item_food_order__subtotal')
            )
            staffs = RestaurantStaff.objects.filter(restaurant=restaurant_id)
            restaurants = Restaurant.objects.all()
            
            food_serializer = FoodSerializer(foods, many=True)
            category_serializer = CategorySerializer(categories, many=True)
            order_serializer = FoodOrderSerializer(orders, many=True)
            staff_serializer = RestaurantStaffSerializer(staffs, many=True)
            restaurant_serializer = RestaurantSerializer(restaurants, many=True)

            return render(request, 'admin/home.html', {
                'status': 'success',
                'foods': food_serializer.data,
                'categories': category_serializer.data,
                'orders': order_serializer.data,
                'staffs': staff_serializer.data,
                'restaurants': restaurant_serializer.data,
                'restaurant_id': restaurant_id,
            })
            
    def staff(request, restaurant_id):
        if request.method == 'GET':
            staffs = RestaurantStaff.objects.filter(restaurant=restaurant_id)
            staff_serializer = RestaurantStaffSerializer(staffs, many=True)
            return render(request, 'admin/staff.html', {
                'status': 'success',
                'staffs': staff_serializer.data,
                'restaurant_id': restaurant_id,
            })
            
    def food(request, restaurant_id):
        if request.method == 'GET':
            foods = Food.objects.filter(category__restaurant_id=restaurant_id)
            categories = Category.objects.filter(restaurant_id=restaurant_id)
            food_serializer = FoodSerializer(foods, many=True)
            category_serializer = CategorySerializer(categories, many=True)
            return render(request, 'admin/food.html', {
                'status': 'success',
                'categories': category_serializer.data,
                'foods': food_serializer.data,
                'restaurant_id': restaurant_id
            })