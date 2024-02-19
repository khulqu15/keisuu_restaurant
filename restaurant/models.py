from django.db import models

from lib.models import BaseModel
from django.utils import timezone


class Restaurant(BaseModel, models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True)
    code = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return self.name


class RestaurantStaff(BaseModel, models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="staff")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    address = models.TextField()
    role = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class KitchenStaff(BaseModel, models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="kitchen")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.name    