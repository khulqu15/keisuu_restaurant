from django.db import models
from restaurant.models import Restaurant

class Customer(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="customer_restaurant")
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Reservation(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="reservation_restaurant")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="reservation_customer")
    date = models.DateField()
    time = models.TimeField()
    number = models.IntegerField()
    
class Table(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="table_restaurant")
    number = models.IntegerField()
    is_reserved = models.BooleanField()