from app.models import Business, BusinessPhoto, EventPhoto, Event, Event_Type, Comment, Advertisement
from rest_framework import serializers


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('name',
                  'location',
                  'address',
                  'lat',
                  'lng',
                  'type',
                  'company_name',
                  'opening_hours',
                  'contact_email',
                  'contact_phone',
                  'user',
                  'profilePhoto')


class BusinessPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessPhoto
        fields = ('path',
                  'business')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('name',
                  'location',
                  'datetime',
                  'type',
                  'theme',
                  'min_age',
                  'organization',
                  'dress_code',
                  'business')


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Type
        fields = 'name'


class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPhoto
        fields = ('path',
                  'event')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('classification',
                  'body',
                  'event')


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = ('event',
                  'date',
                  'expire',
                  'body')
