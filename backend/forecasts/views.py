from collections import Counter

from django.db.models import Avg
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Location, WeatherForecast, UserQuery
from .serializers import LocationSerializer, WeatherForecastSerializer, UserQuerySerializer, UserQueryCreateSerializer


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationDetail(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class WeatherForecastList(generics.ListAPIView):
    queryset = WeatherForecast.objects.all()
    serializer_class = WeatherForecastSerializer


class UserQueryCreateView(generics.CreateAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQueryCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = self.request.user
        location = request.data.get('location')
        date = request.data.get('date')
        time = request.data.get('time', None)

        # Check if a UserQuery with the same location, date, and time already exists for the user
        existing_query = UserQuery.objects.filter(user=user, location=location, date=date, time=time).first()

        if existing_query:
            serializer = UserQuerySerializer(existing_query)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If no existing query, proceed with creating a new one
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_query = serializer.save()

        # Perform average weather computation if time is null
        if not time:
            self.compute_average_weather(user_query)

        response_data = {
            'queryId': user_query.id,
            'status': 'processing'
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    def compute_average_weather(self, user_query):
        # Check if the average forecast already exists
        avg_forecast = WeatherForecast.objects.filter(
            location=user_query.location,
            date=user_query.date,
            time__isnull=True
        ).first()

        if avg_forecast:
            user_query.result = avg_forecast
            user_query.status = 'Completed'
            user_query.save()
            return

        forecasts = WeatherForecast.objects.filter(
            location=user_query.location,
            date=user_query.date
        )

        average_weather = forecasts.aggregate(
            average_temperature=Avg('temperature')
        )

        if forecasts.exists():
            descriptions = [forecast.description for forecast in forecasts]
            most_common_description = Counter(descriptions).most_common(1)[0][0]

            avg_forecast = WeatherForecast.objects.create(
                location=user_query.location,
                date=user_query.date,
                time=None,
                temperature=average_weather['average_temperature'],
                description=most_common_description
            )
            user_query.result = avg_forecast
            user_query.status = 'Completed'
            user_query.save()
        else:
            user_query.status = 'Failed'
            user_query.save()


class UserQueryDetailView(generics.RetrieveAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQuerySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
