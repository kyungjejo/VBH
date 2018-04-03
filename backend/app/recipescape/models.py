from django.db import models

# Create your models here.

class Annotations(models.Model):
    videoName = models.TextField()
    t = models.TextField() # type of video
    img = models.TextField()
    num = models.IntegerField() # id of annotations
    obj = models.TextField()
    xmin = models.IntegerField()
    xmax = models.IntegerField()
    ymin = models.IntegerField()
    ymax = models.IntegerField()

class idNamePair(models.Model):
    t = models.TextField()
    num = models.IntegerField()
    title = models.TextField()

class Equations(models.Model):
    videoName = models.TextField()
    num = models.IntegerField()
    t = models.TextField()
    step_num = models.IntegerField()
    step_des = models.TextField()
    step_start = models.IntegerField()
    step_end = models.IntegerField()