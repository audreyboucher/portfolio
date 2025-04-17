from django.db import models

class Message(models.Model):
  name = models.CharField(max_length=30, blank=False, null=False)
  email = models.CharField(max_length=200, blank=False, null=False)
  message = models.TextField(blank=False, null=False)

  def _str_(self):
    return self.id
