from django.shortcuts import render
import json
from django.http import HttpResponse
import csv
import os
from django.templatetags.static import static

# Create your views here.
def dummyData(request):
    url = static("id.csv")
    with open(url, 'rb') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            print (row[0],row[1])
    
    dummySimVideos = [
        [{'videoPath':'1.mp4','equation':'y=fx'}],
        [
            {'videoPath':'video4.mp4','equation':'y=fx','start':'86','end':'107','title':'Homemade Pizza Video Recipe⭐️ | Start to Finish Pizza Recipe with Dough, Sauce and Toppings'},
            {'videoPath':'video5.mp4','equation':'y=fx','start':'81','end':'98','title':'Make Your Own: Pepperoni Pizza'},
            {'videoPath':'video6.mp4','equation':'y=fx','start':'98','end':'111','title':'Step-By-Step How To Make Your Own: Pepperoni Pizza | Homemade Cheesy Bites Pepperoni Pizza Recipe'},
            {'videoPath':'video7.mp4','equation':'y=fx','start':'51','end':'60','title':'Homemade Pizza Margherita By Mario Batali'},
            {'videoPath':'video8.mp4','equation':'y=fx','start':'31','end':'35','title':'How to Make Margherita Pizza at Home - Gordon Ramsay'},
            {'videoPath':'video9.mp4','equation':'y=fx','start':'308','end':'345','title':'How To Make Homemade Pizza! | Tanya Burr'},
            {'videoPath':'video10.mp4','equation':'y=fx','start':'189','end':'221','title':'Quick n Easy Homemade Pizza Recipe'},
        ],
        [{'videoPath':'3.mp4','equation':'y=fx'}],
      ]
    dummyCoordinates = [
        {'start':0,'length':10,'data':[{'x':10,'y':10,'object':'Dough'},{'x':30,'y':200,'object':'Pizza'}]},
        {'start':10,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':20,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':30,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':40,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':50,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':60,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':70,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
        {'start':80,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]}]
    response_data = {}
    response_data['dummySimVideos'] = dummySimVideos
    response_data['dummyCoordinates'] = dummyCoordinates

    return HttpResponse(json.dumps(response_data), content_type="application/json")