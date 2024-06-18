from django.urls import path
from .views import LocationList, LocationDetail, UserQueryCreateView, UserQueryDetailView

urlpatterns = [
    path('locations/', LocationList.as_view(), name='location-list'),
    path('locations/<int:id>/', LocationDetail.as_view(), name='location-detail'),
    path('queries/', UserQueryCreateView.as_view(), name='user-query-create'),
    path('queries/<int:id>/', UserQueryDetailView.as_view(), name='user-query-detail'),
]
