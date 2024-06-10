from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

"""
queryset - The queryset that should be used for returning objects from this view.
Typically, you must either set this attribute, or override the get_queryset() method.
If you are overriding a view method, it is important that you call get_queryset() instead
of accessing this property directly, as queryset will get evaluated once, and those results will
be cached for all subsequent requests.
"""