from django.shortcuts import redirect


class APIBaseMixin:
    authentication_classes = []
    permission_classes = []