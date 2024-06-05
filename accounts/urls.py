from django.urls import path
from .views import UserDetailView, add_favorite, remove_favorite

urlpatterns = [
    path('details/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('add_favorite/<int:pk>/', add_favorite, name='add-favorite'),
    path('remove_favorite/<int:pk>/', remove_favorite, name='remove-favorite'),
]
