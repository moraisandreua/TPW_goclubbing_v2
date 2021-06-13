from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Business, BusinessPhoto, Event, EventPhoto, Event_Type, Comment, Advertisement
from app.serializers import BusinessSerializer, BusinessPhotoSerializer, EventSerializer, EventTypeSerializer, EventPhotoSerializer, CommentSerializer, AdvertisementSerializer
from dateutil import parser
from rest_framework.renderers import JSONRenderer
import base64
import json
# Create your views here.


@api_view(['GET'])
def get_all_businesses(request):
    businesses = Business.objects.all()
    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_business_photos(request):
    business_photos = BusinessPhoto.objects.all()
    serializer = BusinessPhotoSerializer(business_photos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_business_by_fields(request):

    businesses = Business.objects.all()

    if 'name' in request.GET:
        businesses = businesses.filter(name__icontains=request.GET['name'])
    if 'location' in request.GET:
        businesses = businesses.filter(location__icontains=request.GET['location'])
    if 'address' in request.GET:
        businesses = businesses.filter(address__icontains=request.GET['address'])
    if 'lat' in request.GET:
        businesses = businesses.filter(lat__exact=request.GET['lat'])
    if 'lon' in request.GET:
        businesses = businesses.filter(lng__exact=request.GET['lng'])
    if 'type' in request.GET:
        businesses = businesses.filter(type__icontains=request.GET['type'])
    if 'company_name' in request.GET:
        businesses = businesses.filter(company_name__icontains=request.GET['company_name'])
    if 'contact_email' in request.GET:
        businesses = businesses.filter(contact_email__exact=request.GET['contact_email'])
    if 'contact_phone' in request.GET:
        businesses = businesses.filter(contact_phone__exact=request.GET['contact_phone'])

    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_events_by_fields(request):

    events = Event.objects.all()

    if 'name' in request.GET:
        events = events.filter(name__icontains=request.GET['name'])
    if 'location' in request.GET:
        events = events.filter(location__icontains=request.GET['location'])
    if 'datetime' in request.GET:
        datetime_str = request.GET['datetime']
        date = parser.parse(datetime_str)
        events = events.filter(datetime__gte=date)
    if 'type' in request.GET:
        events = events.filter(type__name__icontains=request.GET['type'])
    if 'theme' in request.GET:
        events = events.filter(theme__icontains=request.GET['theme'])
    if 'min_age' in request.GET:
        events = events.filter(min_age__exact=request.GET['min_age'])
    if 'organization' in request.GET:
        events = events.filter(organization__icontains=request.GET['organization'])
    if 'dress_code' in request.GET:
        events = events.filter(dress_code__icontains=request.GET['dress_code'])

    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)
