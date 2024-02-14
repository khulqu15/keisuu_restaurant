import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Food, Category, Translation
from restaurant.models import Restaurant
from payment.serializers import OrderItemSerializer, FoodOrderSerializer, FoodOrderSerializerPost, PaymentSerializer
from payment.models import OrderItem, FoodOrder, Payment
from customer.models import Table, Customer
from customer.serializers import TableSerializer, CustomerSerializer
from .serializers import FoodSerializer, CategorySerializer, TranslationSerializer

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                "status": "success",
                "data": serializer.data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "data": serializer.data
        })
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": "success",
            "data": serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response({
            "status": "success",
            "data": serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "status": "success",
            "message": "Food deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                "status": "success",
                "data": serializer.data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "data": serializer.data
        })
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": "success",
            "data": serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response({
            "status": "success",
            "data": serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "status": "success",
            "message": "Food Category deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)
        
class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().order_by('id'))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                "status": "success",
                "data": serializer.data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "data": serializer.data
        })
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": "success",
            "data": serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response({
            "status": "success",
            "data": serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "status": "success",
            "message": "Food Category deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)
        
        
@api_view(['GET'])
def GetTable(request, restaurant_id):
    if request.method == 'GET':
        tables = Table.objects.filter(is_reserved=False).first()
        if tables is not None:
            data = {
                'is_reserved': True
            }
            customer_data = {
                'restaurant': restaurant_id,
                'name': 'Customer Restaurant '+str(restaurant_id)
            }
            customer_serializer = CustomerSerializer(data=customer_data, partial=True)
            if customer_serializer.is_valid():
                customer_serializer.save()
            serializer = TableSerializer(tables, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    'status': "success",
                    'table': serializer.data,
                    'customer': customer_serializer.data
                })
        else:
            return JsonResponse({
                'status': "error",
                'message': "Restaurant Table Are Full"
            })

@api_view(['GET'])
def SetTableAvailable(request, restaurant_id, table_id):
    if request.method == 'GET':
        table = get_object_or_404(Table, pk=table_id)
        data = {
            'is_reserved': False
        }
        serializer = TableSerializer(table, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'status': "success",
                'data': serializer.data
            })
        else:
            return JsonResponse({
                'status': "error",
                'data': "Error Invalid Data"
            })
            
@api_view(['GET'])
def RequestNewCustomer(request, restaurant_id):
    if request.method == 'GET':
        data = {
            'restaurant': restaurant_id,
            'name': 'Customer Restaurant '+str(restaurant_id)
        }
        serializer = CustomerSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'status': "success",
                'data': serializer.data
            })
        else:
            return JsonResponse({
                'status': "error",
                'data': "Error Invalid Data"
            })
            
@api_view(['DELETE'])
def DeleteEndedCustomer(request, restaurant_id, customer_id):
    if request.method == 'DELETE':
        customer = get_object_or_404(Customer, pk=customer_id)
        customer.delete()
        return JsonResponse({
            "status": "success",
            "message": "Customer removed successfully"
        })            

@api_view(['GET'])
def GetAllFoods(request, restaurant_id):
    if request.method == 'GET':
        categories = Category.objects.filter(restaurant=restaurant_id)
        serializer_class = CategorySerializer(categories, many=True).data
        return JsonResponse({
            "status": "success",
            "data": serializer_class 
        })

@api_view(['GET'])
def GetAllOrder(request, restaurant_id):
    if request.method == 'GET':
        foodsOrder = FoodOrder.objects.all().order_by('id')
        serializer_class = FoodOrderSerializer(foodsOrder, many=True).data
        return JsonResponse({
            "status": "success",
            "data": serializer_class 
        })

@api_view(['GET'])
def GetAFood(request, restaurant_id, food_id):
    food = get_object_or_404(Food, restaurant=restaurant_id, pk=food_id)
    if request.method == 'GET':
        serializer = FoodSerializer(food)
        return Response({
            'status': 'success',
            'data': serializer.data
        })
    
@api_view(['POST'])
def RequestOrder(request, restaurant_id):
    if request.method == 'POST':
        data = {
            "customer": request.data.get('customer'),
            "table": request.data.get('table'),
            "item": request.data.get('quantity'),
            "subtotal": request.data.get('subtotal'),
            "timestamp": timezone.now()
        }
        serializer = FoodOrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def RequestOrder(request, restaurant_id):
    if request.method == 'POST':
        data = {
            "customer": request.data.get('customer'),
            "table": request.data.get('table'),
            "order_time": request.data.get('order_time'),
            "status": request.data.get('status'),
        }
        serializer = FoodOrderSerializerPost(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def RequestFood(request, restaurant_id, food_id):
    check = get_object_or_404(Food, restaurant=restaurant_id, pk=food_id)
    food = FoodSerializer(check)
    if request.method == 'POST':
        data = {
            "order": request.data.get('order'),
            "food": food_id,
            "quantity": request.data.get('quantity'),
            "subtotal": float(request.data.get('quantity')) * float(food.data.get('price')),
            "timestamp": timezone.now(),
        }
        serializer = OrderItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def GetAnOrder(request, restaurant_id, order_id):
    check = get_object_or_404(FoodOrder, pk=order_id)
    if request.method == 'GET':
        serializer = FoodOrderSerializer(check)
        return Response({
            'status': 'success',
            'data': serializer.data 
        })
        
@api_view(['POST'])
def CreatePayment(request, restaurant_id, order_id):
    check = get_object_or_404(FoodOrder, pk=order_id)
    if request.method == 'POST':
        data = {
            "order": order_id,
            "amount": request.data.get('amount'),
            "timestamp": timezone.now(),
            "is_paid": False
        }
        serializer = PaymentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def PaidPayment(request, restaurant_id, payment_id):
    payment = get_object_or_404(Payment, pk=payment_id)
    if request.method == 'POST':
        data = {
            "is_paid": True
        }
        serializer = PaymentSerializer(payment, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'DELETE'])
def SetStatusOrder(request, restaurant_id, order_id):
    foodOrder = get_object_or_404(FoodOrder, pk=order_id)
    if request.method == 'POST':
        data = {
            "status": request.data.get('status')
        }
        serializer = FoodOrderSerializer(foodOrder, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        foodOrder.delete()
        return Response({
            'status': 'success',
            'message': 'Order deleted' 
        })

@api_view(['POST'])
def SetStatusFood(request, restaurant_id, item_id):
    foodItem = get_object_or_404(OrderItem, pk=item_id)
    if request.method == 'POST':
        data = {
            "status": request.data.get('status')
        }
        serializer = OrderItemSerializer(foodItem, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data 
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
