import itertools
from django.shortcuts import render
from rest_framework import generics, permissions
from movies.models import Movie
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from users.models import CustomUser
from knox.auth import TokenAuthentication
from .serializers import ActionSerializer, DiarySerializer
from .models import Diary
from django.db.models.functions import ExtractMonth, ExtractYear
from .utils import AllowAnyGet
from movies.serializers import MovieSerializer


# Action: relationship with the movie
class Actions(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            tmdb_id = request.data['tmdb_id']
            movie = Movie.objects.get(tmdb_id=tmdb_id)
        except ObjectDoesNotExist:
            return Response({})
        
        actions = {}
        user = CustomUser.objects.get(id=request.user.id)
        actions['watched'] = True if movie in user.watched.all() else False
        actions['watchlist'] = True if movie in user.watchlist.all() else False
        actions['favorites'] = True if movie in user.favorites.all() else False

        return Response(actions)

# Seen movie
class Seen(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        movie, _ = Movie.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        if movie not in user.watched.all():
            user.watched.add(movie)
            value = True
        else:
            user.watched.remove(movie)
            value = False

        data = {'movie': movie.tmdb_id, 'user': user.id,
                'action': 'seen', 'value': value}

        serializer = ActionSerializer(data=data)
        if serializer.is_valid():
            # if the game you just logged was in your backlog,
            # then remove it from backlog
            serializer = serializer.data
            if movie in user.watchlist.all() and value:
                user.watchlist.remove(movie)
                serializer['removedFromWatchlsit'] = True

            return Response(serializer)
        else:
            return Response({})

# Favorite movie
class Favorite(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        movie, _ = Movie.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        if movie not in user.favorites.all():
            user.favorites.add(movie)
            value = True
        else:
            user.favorites.remove(movie)
            value = False

        data = {'movie': movie.tmdb_id, 'user': user.id,
                'action': 'favorite', 'value': value}
        print(data)
        serializer = ActionSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response({})

# Watchlist movie
class Watchlist(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        movie, _ = Movie.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        if movie not in user.watchlist.all():
            user.watchlist.add(movie)
            value = True
        else:
            user.watchlist.remove(movie)
            value = False

        data = {'movie': movie.tmdb_id, 'user': user.id,
                'action': 'watchlist', 'value': value}

        serializer = ActionSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response({})


# Log movie
class DiaryView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAnyGet,)

    def post(self, request, *args, **kwargs):
        """
        args:
            movie: movie's info
            date:
            review:
            favorite:
            rating
        """
        data = {
            'tmdb_id': request.data['movie']['id'],
            'adult': request.data['movie']['adult'],
            'belongs_to_collection': False,
            'budget': request.data['movie']['budget'],
            'homepage': request.data['movie']['homepage'],
            'imdb_id': request.data['movie']['imdb_id'],
            'original_language': request.data['movie']['original_language'],
            'original_title': request.data['movie']['original_title'],
            'overview': request.data['movie']['overview'],
            'popularity': request.data['movie']['popularity'],
            'backdrop_path': request.data['movie']['backdrop_path'],
            'poster_path': request.data['movie']['poster_path'],
            'release_date': request.data['movie']['release_date'],
            'revenue': request.data['movie']['revenue'],
            'runtime': request.data['movie']['runtime'],
            'status': request.data['movie']['status'],
            'tagline': request.data['movie']['tagline'],
            'title': request.data['movie']['title'],
            'video': request.data['movie']['video'],
            'vote_average': request.data['movie']['vote_average'],
            'vote_count': request.data['movie']['vote_count'],
        }
        #print(data)
        #movie, _ = Movie.objects.update_or_create(**data)
        try:
            movie = Movie.objects.get(tmdb_id=data['tmdb_id'])
        except Movie.DoesNotExist:
            print(data)
            movie = Movie.objects.create(**data)
        if not request.user.id:
            return Response('Forbidden')

        user = CustomUser.objects.get(id=request.user.id)
        request.data['movie'] = movie

        if request.data['rating'] == '':
            request.data['rating'] = None
        #TODO: format done client side
        if request.data['date'] != '':
            request.data['date'] = request.data['date'].split('T')[0]
        #if request.data.get('rating'):
        #    r, _ = Ratings.objects.get_or_create(game=game, user=user)
        #    r.rating = request.data['rating']
        #    r.save()


        if request.data.get('favorite') and not movie in user.favorites.all():
            user.favorites.add(movie)

        if movie in user.watchlist.all():
            user.watchlist.remove(movie)
        #print(request.data)

        entry = Diary.objects.create(user=user, **request.data)

        if user.recent.all().count() < 4:
            user.recent.add(entry)
        else:
            oldest_entry = user.recent.first()
            user.recent.remove(oldest_entry)
            user.recent.add(entry)
        
        if not movie in user.watched.all():
            user.watched.add(movie)
        
        return Response(DiarySerializer(entry).data)

    def get(self, request, *args, **kwargs):
        limit = int(request.GET.get('limit', 0))
        if limit <= 0:
            limit = None

        user = CustomUser.objects.get(username=request.GET['username'])
        entries = Diary.objects.filter(user=user).annotate(
                    month=ExtractMonth('date'), 
                    year=ExtractYear('date')).order_by('-date')[:limit]

        # http://ls.pwd.io/2013/05/create-groups-from-lists-with-itertools-groupby/
        response = []
        year_getter = lambda x: x.year
        month_getter = lambda x: x.month
        for year, year_entries in itertools.groupby(entries, key=year_getter):
            year = {'year': year, 'months': []}
            for month, group in itertools.groupby(list(year_entries), key=month_getter):
                month_entries = DiarySerializer(list(group), many=True)
                month = {'month': month, 'entries': month_entries.data}
                year['months'].append(month)

            response.append(year)

        return Response(response)

