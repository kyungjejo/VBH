from django.contrib import admin
from .models import Annotations, idNamePair

# Register your models here.

@admin.register(Annotations)
class AnnotationsAdmin(admin.ModelAdmin):
    pass

@admin.register(idNamePair)
class idNamePairAdmin(admin.ModelAdmin):
    pass