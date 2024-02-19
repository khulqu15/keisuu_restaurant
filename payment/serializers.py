from rest_framework import serializers
from .models import OrderItem, FoodOrder, Payment
from food.serializers import FoodSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    foods = FoodSerializer(source="order_item_food", many=True, required=False)
    class Meta:
        model = OrderItem
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
        
class FoodOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source="order_item_food_order", many=True, required=False)
    foods = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = FoodOrder
        fields = "__all__"
        depth = 1
        
    def get_foods(self, obj):
        foods = [item.food for item in obj.order_item_food_order.all()]
        return FoodSerializer(foods, many=True).data
    
    def get_total_price(self, obj):
        return sum(item.subtotal for item in obj.order_item_food_order.all())
    
class FoodOrderSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = FoodOrder
        fields = "__all__"