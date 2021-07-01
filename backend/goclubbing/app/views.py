import base64

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.files import File
from django.core.files.base import ContentFile
from django.db import IntegrityError
from django.db.models import FileField
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework import status, schemas
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

from app.models import Business, BusinessPhoto, Event, EventPhoto, Event_Type, Comment, Advertisement
from app.serializers import BusinessSerializer, BusinessPhotoSerializer, EventSerializer, EventTypeSerializer, \
    EventPhotoSerializer, CommentSerializer, AdvertisementSerializer, UserSerializer
from dateutil import parser
# Create your views here.


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_all_businesses(request):
    businesses = Business.objects.all()
    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_businesses_events(request, obj_id):
    events = Event.objects.filter(business_id=obj_id)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_business_types(request):
    businesses = Business.objects.all()
    types = []
    response = []
    for business in businesses:
        if business.type not in types:
            types.append(business.type)

    for type in types:
        msg = {
            "type": type
        }
        response.append(msg)

    return Response(response)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_event_types(request):
    event_types = Event_Type.objects.all()
    serializer = EventTypeSerializer(event_types, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_all_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_all_comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_all_advertisement(request):
    advertisements = Advertisement.objects.all()
    serializer = AdvertisementSerializer(advertisements, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_business_by_fields(request):

    businesses = Business.objects.all()

    if 'id' in request.GET:
        businesses = businesses.filter(id=request.GET['id'])
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
@permission_classes((AllowAny,))
def get_events_by_fields(request):

    events = Event.objects.all()

    if 'id' in request.GET:
        events = events.filter(id=request.GET['id'])
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
@permission_classes((AllowAny,))
def get_comments_by_fields(request):

    comments = Comment.objects.all()

    if 'id' in request.GET:
        comments = comments.filter(id=request.GET['id'])
    if 'classification' in request.GET:
        comments = comments.filter(classification__gte=request.GET['classification'])
    if 'event' in request.GET:
        event = Event.objects.filter(id=request.GET['event']).first()
        comments = comments.filter(event=event)

    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_advertisement_by_fields(request):

    advertisements = Advertisement.objects.all()

    if 'id' in request.GET:
        advertisements = advertisements.filter(id=request.GET['id'])
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
@permission_classes((AllowAny,))
def get_all_business_photos(request):

    business_photos = BusinessPhoto.objects.all()
    list = []

    if request.method == 'GET':
        for bp in business_photos:
            f = open(bp.path.path, 'rb')
            photo = base64.b64encode(f.read())
            f.close()
            msg = {
                'id': bp.id,
                'path': photo,
                'business': bp.business.id
            }
            list.append(msg)
        return Response(list)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_business_photos_by_business_id(request, obj_id):

    try:
        business_photos = BusinessPhoto.objects.filter(business_id=obj_id)
    except BusinessPhoto.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    list_events = []

    if request.method == 'GET':
        for ep in business_photos:
            f = open(ep.path.path, 'rb')
            photo = base64.b64encode(f.read())
            f.close()
            msg = {
                'id': ep.id,
                'path': photo,
                'business': ep.business.id
            }
            list_events.append(msg)
        return Response(list_events)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_all_events_photos(request):

    event_photos = EventPhoto.objects.all()
    list = []

    if request.method == 'GET':
        for ep in event_photos:
            f = open(ep.path.path, 'rb')
            photo = base64.b64encode(f.read())
            f.close()
            msg = {
                'id': ep.id,
                'path': photo,
                'event': ep.event.id
            }
            list.append(msg)
        return Response(list)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_events_photos_by_event_id(request, obj_id):

    try:
        event_photos = EventPhoto.objects.filter(event_id=obj_id)
    except EventPhoto.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    list_events = []

    if request.method == 'GET':
        for ep in event_photos:
            f = open(ep.path.path, 'rb')
            photo = base64.b64encode(f.read())
            f.close()
            msg = {
                'id': ep.id,
                'path': photo,
                'event': ep.event.id
            }
            list_events.append(msg)
        return Response(list_events)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_users_by_id(request, obj_id):
    users = User.objects.get(id=obj_id)
    serializer = UserSerializer(users)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((AllowAny,))
def create_business(request):
    try:
        user = User.objects.create_user(username=request.data["username"], password=request.data["password"])
        user.save()

        business = Business(name=request.data["name"], location=request.data["location"],
                            type=request.data["type"], company_name=request.data["company_name"],
                            contact_email=request.data["contact_email"], contact_phone=request.data["contact_phone"],
                            user=user)
        business.save()
        serializer = BusinessSerializer(business)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except IntegrityError as e:
        msg = {
            "error": "Username already exists!"
        }
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['POST'])
def create_business_photo(request):
    photo = request.data["path"]
    business = request.data["business"]
    if photo is None:
        return Response({"error": "Path argument was not present!"}, status=status.HTTP_400_BAD_REQUEST)
    if business is None:
        return Response({"error": "Business argument was not present!"}, status=status.HTTP_400_BAD_REQUEST)
    photo = base64.b64decode(photo)
    business = Business.objects.get(id=business)
    flag = True
    i = 0
    while flag:
        try:
            business_photo = BusinessPhoto()
            path = ContentFile(photo, name=business.name+'.jpeg')
            business_photo.path = path
            business_photo.business = business
            business_photo.save()

            msg = {
                'id': business_photo.id,
                'path': business_photo.path.name,
                'business': business_photo.business.id
            }

            flag = False
        except FileExistsError as e:
            i = i + 1
    return Response(msg, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def create_event_photo(request):
    photo = request.data["path"]
    event = request.data["event"]
    if photo is None:
        return Response({"error": "Path argument was not present!"}, status=status.HTTP_400_BAD_REQUEST)
    if event is None:
        return Response({"error": "Business argument was not present!"}, status=status.HTTP_400_BAD_REQUEST)
    photo = base64.b64decode(photo)
    event = Event.objects.get(id=event)
    flag = True
    i = 0
    while flag:
        try:
            event_photo = EventPhoto()
            path = ContentFile(photo, name=event.name+'.jpeg')
            event_photo.path = path
            event_photo.event = event
            event_photo.save()

            msg = {
                'id': event_photo.id,
                'path': event_photo.path.name,
                'event': event_photo.event.id
            }

            flag = False
        except FileExistsError as e:
            i = i + 1
    return Response(msg, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def update_business(request):
    business_id = request.data['id']
    try:
        business = Business.objects.get(id=business_id)
        if request.user != business.user:
            return Response({'error': 'You cant do that!'}, status=status.HTTP_400_BAD_REQUEST)
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
        business = Business.objects.get(id=event.business_id)
        if request.user != business.user:
            return Response({'error': 'You cant do that!'}, status=status.HTTP_400_BAD_REQUEST)
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
def del_business(request, obj_id):
    try:
        business = Business.objects.get(id=obj_id)
        if request.user != business.user:
            return Response({'error': 'You cant do that!'}, status=status.HTTP_400_BAD_REQUEST)
    except Business.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    business.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def del_event(request, obj_id):
    try:
        event = Event.objects.get(id=obj_id)
        business = Business.objects.get(id=event.business_id)
        if request.user != business.user:
            return Response({'error': 'You cant do that!'}, status=status.HTTP_400_BAD_REQUEST)
    except Event.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def del_comment(request, obj_id):
    try:
        comment = Comment.objects.get(id=obj_id)
    except Comment.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def del_advertisement(request, obj_id):
    try:
        advertisement = Advertisement.objects.get(id=obj_id)
    except Advertisement.DoesNotExist:
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
    advertisement.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)

    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)

    try:
        business = Business.objects.get(user=user)
    except Business.DoesNotExist as e:
        return Response({'error': "User doesnt have a business!"},
                        status=status.HTTP_404_NOT_FOUND)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'business': business.id},
                    status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def verify(request, obj_id):
    try:
        business = Business.objects.get(id=obj_id)
        if request.user != business.user:
            return Response({'error': "Users dont match!"}, status=status.HTTP_400_BAD_REQUEST)
    except Business.DoesNotExist:
        return Response({'error': "Business doesnt exist!"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': "Users match!"}, status=status.HTTP_200_OK)


@api_view()
@renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
@permission_classes((AllowAny,))
def schema_view(request):
    generator = schemas.SchemaGenerator(title='GoClubbing API')
    return Response(generator.get_schema(request=request))

