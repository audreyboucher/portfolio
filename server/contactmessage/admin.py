from django.contrib import admin
from .models import Message

class MessageAdmin(admin.ModelAdmin):
  pass
  list_display = ('id', 'name', 'email', 'message')

admin.site.register(Message, MessageAdmin)
