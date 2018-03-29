from . import views
from django.conf.urls import url

urlpatterns = [
    url('dummyData', views.dummyData, name="dummyData"),
]