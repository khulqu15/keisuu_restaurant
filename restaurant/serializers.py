from rest_framework import serializers
from .models import Restaurant, RestaurantStaff, KitchenStaff

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = "__all__"
        
class RestaurantStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantStaff
        fields = "__all__"

class KitchenStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = KitchenStaff
        fields = "__all__"