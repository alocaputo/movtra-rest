from rest_framework import serializers
from movies.serializers import MovieSerializer
from .models import List
from django.contrib.auth import authenticate

class ListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=16)
    movies = MovieSerializer(read_only=True)
    private = serializers.BooleanField()
    official = serializers.BooleanField()

    class Meta:
        model = List
        fields = ('id',
        'name','movies','private','official')