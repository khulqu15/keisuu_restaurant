from rest_framework import serializers
from .models import Reservation, Customer, Table

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = "__all__"
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = "__all__"