from rest_framework import serializers
from .models import Category, Food, Translation

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"
        
class CategorySerializer(serializers.ModelSerializer):
    foods = FoodSerializer(source="category_food", many=True, required=False)
    class Meta:
        model = Category
        fields = "__all__"
        
class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = "__all__"