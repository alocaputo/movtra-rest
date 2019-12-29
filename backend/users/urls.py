from django.urls import path, include
from knox import views as knox_views
from . import views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('user', views.UserView.as_view()),
    path('<str:username>', views.ProfileView.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox-logout'), # auth/logout/
]
