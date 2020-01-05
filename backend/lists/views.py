from users.serializers import UserSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from users.models import CustomUser
from knox.auth import TokenAuthentication
from .serializers import ListSerializer
from .models import List
from actions.utils import AllowAnyGet
from movies.serializers import MovieSerializer

# Public list
class PublicListView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAnyGet,)

    def get(self, request, *args, **kwargs):
        limit = int(request.GET.get('limit', 0))
        if limit <= 0:
            limit = None

        user = CustomUser.objects.get(username=request.GET['username'])
        lists = List.objects.filter(user=user,private=False,official=False)
        response = {}

        for index, entry in enumerate(lists):
            movies = MovieSerializer(entry.movies,many=True)
            user = UserSerializer(entry.user)
            response[index] = {'id': entry.id, 'name': entry.name, 'user': user.data['id'], 'movies': movies.data, 'private': entry.private, 'official': entry.official}
            
        return Response(response)

# Official list
class OfficialListView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAnyGet,)

    def get(self, request, *args, **kwargs):
        limit = int(request.GET.get('limit', 0))
        if limit <= 0:
            limit = None

        lists = List.objects.filter(private=False,official=True)
        response = {}

        for index, entry in enumerate(lists):
            movies = MovieSerializer(entry.movies,many=True)
            response[index] = {'id': entry.id, 'name': entry.name,  'movies': movies.data, 'private': entry.private, 'official': entry.official}
            
        return Response(response)

# Private list
class PrivateListView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        limit = int(request.GET.get('limit', 0))
        if limit <= 0:
            limit = None

        user = CustomUser.objects.get(id=request.user.id)
        lists = List.objects.filter(user=user,private=True)
        response = {}

        for index, entry in enumerate(lists):
            movies = MovieSerializer(entry.movies,many=True)
            user = UserSerializer(entry.user)
            response[index] = {'id': entry.id, 'name': entry.name, 'user': user.data['id'], 'movies': movies.data, 'private': entry.private, 'official': entry.official}
            
        return Response(response)