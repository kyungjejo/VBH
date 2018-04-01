from . import views
from django.conf.urls import url

urlpatterns = [
    url('listView', views.listView, name="listView"),
    url('fetchTitle', views.fetchTitle, name="fetchTitle"),
    url('fetchCoordinates', views.fetchCoordinates, name="fetchCoordinates"),
    url('fetchSnippets', views.fetchSnippets, name="fetchSnippets"),
    url('fetchTiming', views.fetchTiming, name="fetchTiming"),
]