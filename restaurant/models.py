from django.db import models
# from payment.models import OrderItem

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class RestaurantStaff(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="staff")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    address = models.TextField()
    def __str__(self):
        return self.name

class KitchenStaff(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="kitchen")
    # order = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="order_kitchen")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    address = models.TextField()
    def __str__(self):
        return self.name