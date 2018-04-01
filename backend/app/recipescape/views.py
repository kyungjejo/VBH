from django.shortcuts import render
import json
from django.http import HttpResponse
import csv
import os
from django.templatetags.static import static
import random

from .models import Annotations, idNamePair

# Create your views here.

def annotationToModel(f,t,row):
    Annotations.objects.get_or_create(
        videoName = f.replace(".csv",""),
        t = t,
        img = row[0],
        num = int(row[1]),
        obj = row[2],
        xmin = int(int(row[3])/3*2),
        xmax = int(int(row[4])/3*2),
        ymin = int(int(row[5])/3*2),
        ymax = int(int(row[6])/3*2)
    )

def idToModel(t,i,name):
    idNamePair.objects.get_or_create(
        t=t,
        num=i,
        title=name
    )

# with open("static/id.csv") as csvfile:
#     reader = csv.reader(csvfile)
#     for row in reader:
#         print (row)
#         idToModel("pizza",row[0],row[1])

def csvToDB(t):
    for f in os.listdir('static/annotations/'):
        if f.endswith(".csv"):
            with open("static/annotations/"+f) as csvfile:
                reader = csv.reader(csvfile)
                name = idNamePair.objects.get(num=f.split("___")[0]).title
                for row in reader:
                    if not row[0][0].isdigit(): continue
                    Annotations.objects.get_or_create(
                        videoName = name,
                        t = t,
                        img = row[0],
                        num = int(float(row[1])),
                        obj = row[2],
                        xmin = int(float(row[-4])),
                        xmax = int(float(row[-3])),
                        ymin = int(float(row[-2])),
                        ymax = int(float(row[-1]))
                    )
# csvToDB('pizza')

def listView(request):
    response_data = {}
    items = []
    with open("static/id.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            items.append({'id':row[0],'title':row[1]})
    response_data['items'] = items
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def fetchCoordinates(request):
    num = request.GET.get('id')
    end = float(request.GET.get('time'))+5
    title = idNamePair.objects.get(num=num).title
    response_data = {}
    response_data['coordinates'] = []
    r = lambda: random.randint(0,255)
    threshold = 0
    for a in Annotations.objects.filter(videoName=title):
        if float(a.img.replace(".png",""))>float(end):
            break
        else:
            threshold = a.img
    print (threshold)
    for i in Annotations.objects.filter(videoName=title,img=threshold):
        color = '#%02X%02X%02X' % (r(),r(),r())
        response_data['coordinates'].append({'color': color, 'object':i.obj,'x':int(i.xmin)/3*2,'y':int(i.ymin)/3*2,'width':int((i.xmax-i.xmin)/3*2),'height':int((i.ymax-i.ymin)/3*2)})
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def fetchSnippets(request):
    item = request.GET.get('item')
    num = request.GET.get('id')
    response_data = {}
    response_data['snippets'] = []
    response_data['highlights'] = []
    title = idNamePair.objects.get(num=num).title
    for a in Annotations.objects.filter(obj=item, videoName=title):
        time = a.img.replace(".png",'')
        response_data['highlights'].append(time)
    for a in Annotations.objects.filter(obj=item):
        if len(response_data['snippets'])>10:
            break   
        start = float(a.img.replace('.png',''))
        end = start+15
        videoName = "+".join(a.videoName.split(" "))
        name = a.videoName+".mp4" if ".mp4" not in a.videoName else a.videoName
        response_data['snippets'].append({'id': idNamePair.objects.get(title=name).num,'start':start,'end':end,'filepath':videoName})
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def fetchTitle(request):
    num =  request.GET.get('id')
    title = idNamePair.objects.get(num=num).title
    response_data = {}
    response_data['title'] = title
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def fetchTiming(request):
    if request.GET.get('id'):
        num = request.GET.get('id')
        title = idNamePair.objects.get(num=num).title
    print ("title", title)
    response_data = {}
    response_data['timing'] = []
    for a in Annotations.objects.filter(videoName=title):
        response_data['timing'].append(int(float(a.img.replace('.png',''))))
    response_data['timing'] = sorted(list(set(response_data['timing'])))
    print ("timing", response_data['timing'])
    return HttpResponse(json.dumps(response_data), content_type="application/json")