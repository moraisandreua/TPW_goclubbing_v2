from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from app.models import Business, BusinessPhoto, Event, EventPhoto, Event_Type, Comment, Advertisement
from app.serializers import BusinessSerializer, BusinessPhotoSerializer, EventSerializer, EventTypeSerializer, EventPhotoSerializer, CommentSerializer, AdvertisementSerializer
from dateutil import parser
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
def get_all_comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_advertisement(request):
    advertisements = Advertisement.objects.all()
    serializer = AdvertisementSerializer(advertisements, many=True)
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


@api_view(['GET'])
def get_comments_by_fields(request):

    comments = Comment.objects.all()

    if 'classification' in request.GET:
        comments = comments.filter(classification__gte=request.GET['classification'])
    if 'event' in request.GET:
        event = Event.objects.filter(id=request.GET['event']).first()
        comments = comments.filter(event=event)

    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_advertisement_by_fields(request):

    advertisements = Advertisement.objects.all()

    if 'event' in request.GET:
        event = Event.objects.filter(id=request.GET['event']).first()
        advertisements = advertisements.filter(event=event)
    if 'date' in request.GET:
        datetime_str = request.GET['date']
        date = parser.parse(datetime_str)
        advertisements = advertisements.filter(date__gte=date)
    if 'expire' in request.GET:
        datetime_str = request.GET['expire']
        date = parser.parse(datetime_str)
        advertisements = advertisements.filter(expire__lt=date)

    serializer = AdvertisementSerializer(advertisements, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_business_photos(request):

    business_photos = BusinessPhoto.objects.all()

    serializer = BusinessPhotoSerializer(business_photos, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_business(request):
    serializer = BusinessSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_advertisement(request):
    serializer = AdvertisementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_business(request):
    business_id = request.data['id']
    try:
        business = Business.objects.get(id=business_id)
    except Business.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    serializer = BusinessSerializer(business, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_event(request):
    event_id = request.data['id']
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_comment(request):
    comment_id = request.data['id']
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    serializer = CommentSerializer(comment, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_advertisement(request):
    advertisement_id = request.data['id']
    try:
        advertisement = Advertisement.objects.get(id=advertisement_id)
    except Advertisement.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    serializer = AdvertisementSerializer(advertisement, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def del_business(request, id):
    try:
        business = Business.objects.get(id=id)
    except Business.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    business.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def del_event(request, id):
    try:
        event = Event.objects.get(id=id)
    except Event.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def del_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def del_advertisement(request, id):
    try:
        advertisement = Advertisement.objects.get(id=id)
    except Advertisement.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    advertisement.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
