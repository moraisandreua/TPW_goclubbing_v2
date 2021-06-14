from django.contrib import admin
from app.models import Business, BusinessPhoto, Event_Type, Event, EventPhoto, Comment, Advertisement

# Register your models here.

admin.site.register(Business)
admin.site.register(BusinessPhoto)
admin.site.register(Event)
admin.site.register(Event_Type)
admin.site.register(EventPhoto)
admin.site.register(Comment)
admin.site.register(Advertisement)