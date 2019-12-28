from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework. response import Response
from rest_framework.exceptions import PermissionDenied
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from .models import CustomUser
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer


class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    http_method_names = ['get', 'head']

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_data = UserSerializer(user, context=self.get_serializer_context())

        return Response({
            'user': user_data.data,
            'token': AuthToken.objects.create(user)[1]
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    #permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_data = UserSerializer(user, context=self.get_serializer_context())

        return Response({
            'user': user_data.data,
            'token': AuthToken.objects.create(user)[1]
        })


class UserView(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user


class ProfileView(generics.GenericAPIView):
    """Endpoint for obtaining a user's profile.

    The profile consists of the user's activity, favorite games, bio, reviews,
    contact information, stats, lists, followers and other stuff. This endpoint
    accepts both GET and POST methods.
    """
    def post(self, request, *args, **kwargs):
        """Method for updating your profile."""
        me = get_object_or_404(CustomUser, id=request.user.id)

        for key in request.data:
          setattr(me, key, request.data[key])

        me.save()
        serializer = ProfileSerializer(me).data
        print(serializer)
        return Response(serializer)

    def get(self, request, *args, **kwargs):
        """Method for getting the profile."""
        user = get_object_or_404(CustomUser, username=kwargs['username'])
        serializer = ProfileSerializer(user).data

        if not request.user.is_anonymous:
            # handle follow logic for showing the following/follow/unfollow
            # buttons in the frontend
            me = CustomUser.objects.get(id=request.user.id)
            serializer['me'] = UserSerializer(me).data
            if user in me.following.all():
                serializer['followingUser'] = True

        return Response(serializer)
