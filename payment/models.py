from django.db import models
from customer.models import Customer, Table
from food.models import Food

class StatusUnits:
    CHOICES = (
        ('pending', 'Pending'),
        ('progress', 'In Progress'),
        ('completed', 'Completed')
    )
    
class StatusItem:
    CHOICES = (
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
        ('pending', 'Pending'),
    )

class FoodOrder(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="food_order_customer")
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name="food_order_table")
    order_time = models.DateTimeField()
    status = models.CharField(max_length=200, choices=StatusUnits.CHOICES)

class OrderItem(models.Model):
    order = models.ForeignKey(FoodOrder, on_delete=models.CASCADE, related_name="order_item_food_order")
    food = models.ForeignKey(Food, on_delete=models.CASCADE, related_name="order_item_food")
    quantity = models.IntegerField()
    subtotal = models.DecimalField(max_digits=20, decimal_places=2)
    timestamp = models.DateTimeField()
    status = models.CharField(max_length=200, choices=StatusItem.CHOICES, default='pending', blank=True)

class Payment(models.Model):
    order = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="payment_order_item")
    timestamp = models.DateTimeField()
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    is_paid = models.BooleanField(default=False, blank=True)