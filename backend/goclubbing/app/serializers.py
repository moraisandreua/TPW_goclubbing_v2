from django.contrib.auth.models import User

from app.models import Business, BusinessPhoto, EventPhoto, Event, Event_Type, Comment, Advertisement
from rest_framework import serializers
from drf_extra_fields.fields import Base64FileField


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('id',
                  'name',
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id",
                  "username")


class BusinessPhotoSerializer(serializers.ModelSerializer):
    path = Base64FileField()

    class Meta:
        model = BusinessPhoto
        fields = ('id',
                  'path',
                  'business')

    def create(self, validated_data):
        path = validated_data.pop('path')
        business = validated_data.pop('business')
        return BusinessPhoto.objects.create(business=business, path=path)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id',
                  'name',
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
        fields = ['name']


class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPhoto
        fields = ('id',
                  'path',
                  'event')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id',
                  'classification',
                  'body',
                  'event')


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = ('id',
                  'event',
                  'date',
                  'expire',
                  'body')
