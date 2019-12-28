import requests
from .models import Movie
from django.conf import settings
from .serializers import MovieSerializer
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from pprint import pprint #debug

# Create your views here.
class MovieViewSet(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MovieSerializer
    http_method_names = ['get', 'head']


@api_view(['GET'])
def get_movie(request, tmdb): 
    """Returns movie's informations.
    Args:
        tmdb: movie's id.

    Returns:
        movie: a JSON containing the movie's information.
    """
    payload = { 'api_key': settings.TMDB_KEY, 'language': 'en-US'}
    url = settings.TMDB_URL.format(endpoint='movie')
    url += str(tmdb)
    r = requests.get(url=url, params=payload)
    if not r:
        raise NotFound(detail='Movie not found.')

    return Response(r.json())

@api_view(['GET'])
def search_movie(request, title):
    """Search a movie based on a title.
    Args:
        title: the search term, title of the desired movie.

    Returns:
        movies: a JSON containing a list of search results.
    """
    payload = {'api_key': settings.TMDB_KEY, 'language': 'en-US', 'query': title, 'page': 1}
    url = settings.TMDB_URL.format(endpoint='search/movie')

    r = requests.get(url=url, params=payload)

    return Response(r.json())

@api_view(['GET'])
def get_upcoming(request):
    """
    Returns:
        movie: a JSON containing upcoming movies.
    """ 
    payload = { 'api_key': settings.TMDB_KEY, 'language': 'en-US', 'page': 1}
    url = settings.TMDB_URL.format(endpoint='movie')
    url += 'upcoming'
    r = requests.get(url=url, params=payload)
    print(r.url)
    if not r:
        raise NotFound(detail='Movies not found.')

    return Response(r.json())

@api_view(['GET'])
def get_now_playing(request): 
    """
    Returns:
        movie: a JSON containing nowplaying movies.
    """ 
    payload = { 'api_key': settings.TMDB_KEY, 'language': 'en-US', 'page': 1}
    url = settings.TMDB_URL.format(endpoint='movie')
    url += 'now_playing'
    r = requests.get(url=url, params=payload)
    print(r.url)
    if not r:
        raise NotFound(detail='Movies not found.')

    return Response(r.json())

@api_view(['GET'])
def get_credits(request, tmdb): 
    """Returns movie's credits.
    Args:
        tmdb: movie's id.

    Returns:
        movie: a JSON containing the movie's credits.
    """
    payload = { 'api_key': settings.TMDB_KEY}
    url = settings.TMDB_URL.format(endpoint='movie')
    url += str(tmdb)
    url += '/credits'
    r = requests.get(url=url, params=payload)
    print(r.url)
    if not r:
        raise NotFound(detail='Movies not found.')

    return Response(r.json())