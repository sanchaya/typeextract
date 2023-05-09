from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
import json
import time
# from tagger.models import Image
import cv2
import uuid
from django.views.decorators.csrf import csrf_exempt
from django.core.files import File
# from typextractor.models import ScriptMap
from django.conf import settings
import io
from typeextractor.models import CharMap,Characters
import os

TEMP_DIR = f"{settings.MEDIA_ROOT}/temp"

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
    filename = f"{TEMP_DIR}/cropped_{str(uuid.uuid4())}.jpg"
    # in_mem_file = io.BytesIO()
    cv2.imwrite(filename,crop_img) 
    # in_mem_file.seek(0)
    # file_obj = File(in_mem_file)
    # ScriptMap.objects.create(char_id=1,co_ordinates=crop,croped_img=filename) 
    return filename



def map_data(croped_img,map_char,co_ordinates):
    """map user data with cropped image"""
    char = Characters.objects.get(character= map_char)
    obj = CharMap.objects.create(character=char,book_info_id=1,page_no=1,co_ordinates=co_ordinates)
    obj.char_img.save(os.path.basename(croped_img), open(croped_img, 'rb'))
    obj.save()
    return obj

@csrf_exempt
def image_process(request):
    print("inside")
    print(request.POST.dict())
    body_unicode = request.body.decode('utf-8')
    # Parse the JSON data into a Python object
    data_ls = json.loads(body_unicode)
    rect_map = data_ls[0]
    user_map = data_ls[1]
    print("rect_map_len",len(rect_map))
    print(data_ls)
    img= 'samp.jpg'
    for i,data in enumerate(rect_map):
        croped_img = crop_image(img,data)
        val = user_map[str(i)]
        char_map = map_data(croped_img,val,data) 

    return JsonResponse({"msg": "mapped successfully","map_url":char_map.char_img.url}, status=200)