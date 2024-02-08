from rest_framework import serializers
from .models import OrderItem, FoodOrder, Payment

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
        
class FoodOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source="order_item_food_order", many=True, required=False)
    class Meta:
        model = FoodOrder
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"