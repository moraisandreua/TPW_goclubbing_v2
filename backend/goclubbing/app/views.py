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
