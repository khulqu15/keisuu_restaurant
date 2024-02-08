from django.db import models
from restaurant.models import Restaurant

class Category(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="restaurant_category")
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
    
class Food(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="restaurant_food")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category_food")
    name = models.CharField(max_length=255)
    japan_name = models.CharField(max_length=255, blank=True)
    myanmar_name = models.CharField(max_length=255, blank=True)
    unit = models.IntegerField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    image = models.ImageField(upload_to='food_image/')
    food_id = models.CharField(max_length=10, blank=True)
    def __str__(self):
        return self.name

class Translation(models.Model):
    english = models.TextField()
    japan = models.TextField()
    myanmar = models.TextField(blank=True)
    def __str__(self):
        return self.name