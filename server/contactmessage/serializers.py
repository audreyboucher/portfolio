from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Message
    fields = ('id', 'name', 'email', 'message')
