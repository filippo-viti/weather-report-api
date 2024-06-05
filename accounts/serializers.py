from django.contrib.auth import get_user_model
from rest_framework import serializers

from forecasts.serializers import LocationSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    favorites = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'favorites']