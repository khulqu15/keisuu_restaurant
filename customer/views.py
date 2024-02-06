from django.shortcuts import render
# from django.views import View
from django.http import HttpResponse

def index(request):
    return render(request, 'customer/index.html')

def checkout(request):
    return render(request, 'customer/checkout.html')

# class Index(View):
#     def get(self, request, *args, **kwargs):
#         return render(request, 'customer/index.html')

# class Checkout(View):
#     def get(self, request, *args, **kwargs):
#         return render(request, 'customer/checkout.html')