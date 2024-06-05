from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.serializers import UserSerializer
from forecasts.models import Location

User = get_user_model()


class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_favorite(request, pk):
    location = Location.objects.get(pk=pk)
    request.user.favorites.add(location)
    return Response({'status': 'favorite added'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_favorite(request, pk):
    location = Location.objects.get(pk=pk)
    request.user.favorites.remove(location)
    return Response({'status': 'favorite removed'})
