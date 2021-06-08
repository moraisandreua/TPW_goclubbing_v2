from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Business, BusinessPhoto, Event, EventPhoto, Event_Type, Comment, Advertisement
from app.serializers import BusinessSerializer, BusinessPhotoSerializer, EventSerializer, EventTypeSerializer, EventPhotoSerializer, CommentSerializer, AdvertisementSerializer

# Create your views here.


@api_view(['GET'])
def get_all_businesses(request):
    businesses = Business.objects.all()
    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_business_by_id(request):
    businesses = Business.objects.all()
    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)
