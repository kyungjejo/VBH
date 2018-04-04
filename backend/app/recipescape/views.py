from django.shortcuts import render
import json
from django.http import HttpResponse
import csv
import os
from django.templatetags.static import static
import random
from random import shuffle

from .models import Annotations, idNamePair, Equations

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

def minToSec(t):
    return int(t.split(":")[0])*60+int(t.split(":")[1])

def eqToDB():
    t="pizza"
    with open('static/segmentation.csv') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if row[0].isdigit():
                Equations.objects.get_or_create(
                    num = int(row[0]),
                    videoName = row[2],
                    t=t,
                    step_num = int(row[3]),
                    step_des = row[4],
                    step_start = minToSec(row[5]),
                    step_end = minToSec(row[6])
                )
# eqToDB()

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
    time = int(request.GET.get('time'))
    e,l = fetchStep(num,time)
    response_data = {}
    response_data['snippets'] = {}
    response_data['snippets']['same'] = []
    response_data['snippets']['not'] = {}
    response_data['highlights'] = []
    title = idNamePair.objects.get(num=num).title
    for a in Annotations.objects.filter(obj=item, videoName=title):
        time = a.img.replace(".png",'')
        response_data['highlights'].append(time)
    for a in Annotations.objects.filter(obj=item).exclude(videoName=title):
        start = float(a.img.replace('.png',''))
        end = start+15
        videoName = "+".join(a.videoName.split(" "))
        name = a.videoName+".mp4" if ".mp4" not in a.videoName else a.videoName
        time = "%2d:%02d" %(int(start)/60,int(start)%60)
        snippet_num = idNamePair.objects.get(title=name).num
        try:
            snippet_e, snippet_l = fetchStep(snippet_num,int(start))
            if snippet_e.step_des == e.step_des:
                response_data['snippets']['same'].append({'id': snippet_num,'start':start,'end':end,'filepath':videoName,'time':time,'step_num':snippet_e.step_num,'step_len':snippet_l,'step_des':snippet_e.step_des})
            else:
                if snippet_e.step_des not in response_data['snippets']['not']:
                    response_data['snippets']['not'][snippet_e.step_des] = []
                else:
                    response_data['snippets']['not'][snippet_e.step_des].append({'id': snippet_num,'start':start,'end':end,'filepath':videoName,'time':time,'step_num':snippet_e.step_num,'step_len':snippet_l,'step_des':snippet_e.step_des})
        except TypeError:
            v = 0
    shuffle(response_data['snippets']['same'])
    if len(response_data['snippets']['same'])>10: response_data['snippets']['same'] = response_data['snippets']['same'][:10]
    # shuffle(response_data['snippets']['not'])
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
    response_data = {}
    response_data['timing'] = []
    for a in Annotations.objects.filter(videoName=title):
        response_data['timing'].append(int(float(a.img.replace('.png',''))))
    response_data['timing'] = sorted(list(set(response_data['timing'])))
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def fetchEquations(request):
    num = request.GET.get('id')
    response_data = {}
    response_data['equations'] = []
    r = lambda: random.randint(0,255)
    for e in Equations.objects.filter(num=num):
        color = '#%02X%02X%02X' % (r(),r(),r())

        if len(response_data['equations']) > 0 and response_data['equations'][len(response_data['equations'])-1]['step_end'] != e.step_start:
            tmp_start = response_data['equations'][len(response_data['equations'])-1]['step_end']
            response_data['equations'].append({'step_num':'-','step_des':'No step','step_start':tmp_start,'step_end':e.step_start,'length':e.step_start-tmp_start,'color':"#FFFFFF"})    
        response_data['equations'].append({'step_num':e.step_num,'step_des':e.step_des,'step_start':e.step_start,'step_end':e.step_end+1,'length':e.step_end+1-e.step_start,'color':color})
    duration = 0
    for x in response_data['equations']:
        if x['step_end'] > duration:
            duration = x['step_end']
    response_data['duration'] = duration
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def fetchSimEquation(request):
    eq = request.GET.get("eq")
    num = request.GET.get('num')
    response_data = {}
    response_data['snippets'] = {}
    response_data['snippets']['same'] = []
    title = idNamePair.objects.get(num=num).title
    print (eq, num)
    des = Equations.objects.get(step_num=eq,num=num).step_des
    print (des)
    for a in Equations.objects.filter(step_des=des).exclude(num=num):
        print (a.step_des)
        start = a.step_start
        end = a.step_end
        videoName = "+".join(idNamePair.objects.get(num=a.num).title.split(" "))
        name = a.videoName+".mp4" if ".mp4" not in a.videoName else a.videoName
        time = "%2d:%02d" %(int(start)/60,int(start)%60)
        snippet_num = a.num
        try:
            snippet_e, snippet_l = fetchStep(snippet_num,int(start))
            response_data['snippets']['same'].append({'id': snippet_num,'start':start,'end':end,'filepath':videoName,'time':time,'step_num':snippet_e.step_num,'step_len':snippet_l,'step_des':snippet_e.step_des})
        except TypeError:
            v=0
    shuffle(response_data['snippets']['same'])
    # if len(response_data['snippets']['same'])>10: response_data['snippets']['same'] = response_data['snippets']['same'][:10]
    return HttpResponse(json.dumps(response_data), content_type="application/json")



def fetchStep(num,time):
    for e in Equations.objects.filter(num=num):
        if e.step_start<=time and e.step_end>=time:
            return e,len(Equations.objects.filter(num=num))