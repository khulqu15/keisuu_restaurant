from rest_framework import serializers
from .models import Category, Food, Translation

class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'japan_name', 'myanmar_name']
        fields = "__all__"

class FoodSerializer(serializers.ModelSerializer):
    category = FoodCategorySerializer(read_only=True)
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