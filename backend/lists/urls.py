from django.urls import path
from . import views

urlpatterns = [
    path('public', views.PublicListView.as_view()),
    path('official', views.OfficialListView.as_view()),
    path('private', views.PrivateListView.as_view()),
]
