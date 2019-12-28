from django.urls import path, include
from knox import views as knox_views
from . import views

urlpatterns = [
    # path('', views.UserList.as_view()),
    # path('register/', views.RegisterView.as_view(), name='register'),
    # path('login/', views.LoginView.as_view(), name='knox-login'),
    # path('logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
    # path('user/', views.UserView.as_view(), name='get-user'),
    # path('profile/<str:username>', views.ProfileView.as_view(), name='get-profile'),
    path('auth', include('knox.urls')),
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('user', views.UserView.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox-logout'),
]
