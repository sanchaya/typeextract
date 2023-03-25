from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
import json
import time
# from tagger.models import Image
import cv2
import uuid
from django.views.decorators.csrf import csrf_exempt
# from typextractor.models import ScriptMap
from django.conf import settings

@csrf_exempt
def view_image(request):
    # image = get_object_or_404(Image, id=image_id)
    return render(request, 'tagger-board.html')

@csrf_exempt
def crop_image(img,crop):
    # Load Image
    img = cv2.imread(img)
    # Prepare crop area
    width, height = round(crop.get('rectWidth')),round(crop.get('rectHeight'))
    x, y = round(crop.get('rectLeft')),round(crop.get('rectTop'))
    # Crop image to specified area using slicing
    crop_img = img[y:y+height, x:x+width]
    filename = f"{settings.MEDIA_ROOT}/temp/cropped_{str(uuid.uuid4())}.jpg"
    cv2.imwrite(filename,crop_img) 
    # ScriptMap.objects.create(char_id=1,co_ordinates=crop,croped_img=filename) 
    return filename

@csrf_exempt
def image_process(request):
    print("inside")
    print(request.POST.dict())
    body_unicode = request.body.decode('utf-8')
    # Parse the JSON data into a Python object
    data_ls = json.loads(body_unicode)
    print(data_ls)
    img= 'samp.jpg'
    for data in data_ls:
        croped_img = crop_image(img,data)

    return JsonResponse({"instance": "ser_instance"}, status=200)