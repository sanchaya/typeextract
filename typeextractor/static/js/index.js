console.log('hello world')
var canvas = new fabric.Canvas('Canvas2D', { selection: false });

var image = document.getElementById('my-image');

var rect, isDown, origX, origY;

var fimg = new fabric.Image(image);



// canvas.setBackgroundImage(fimg, canvas.renderAll.bind(canvas))


// Add the image to canvas
// canvas.add(fabricImage);

 
  // fimg.set({
  //   left: 300,
  //   top: 0
  // });
  // fimg.scaleToHeight(300);
  // fimg.scaleToWidth(300);
  // canvas.add(fimg);


// var element = document.getElementById('canvas');
//  fimg.scaleToHeight(100);
//  fimg.scaleToWidth(500);
//  canvas.setBackgroundImage(fimg);
//  canvas.renderAll();


// set the width and height to the full windows size
// var SCREEN_WIDTH = window.innerWidth;
// // Change to scroll height to make it the size of the document
// var SCREEN_HEIGHT = document.documentElement.scrollHeight;

// Make sure to set the canvas to the screen height and width.
// canvas.width = SCREEN_WIDTH;
// canvas.height = SCREEN_HEIGHT;


// canvas.setWidth(SCREEN_HEIGHT);
// canvas.setHeight(SCREEN_WIDTH);


// canvas.setBackgroundImage(fimg, canvas.renderAll.bind(canvas), {
//   scaleX: fimg.width,
//   scaleY:  fimg.height
// });


canvas.setDimensions({width:fimg.width, height:fimg.height})

canvas.setBackgroundImage(fimg);
var CANVAS_WIDTH = fimg.width
var CANVAS_HEIGHT = fimg.height
var zoom_value = 1


function plus(){
  zoom_value+=1
canvas.setZoom(zoom_value);
canvas.setWidth(CANVAS_WIDTH * zoom_value);
canvas.setHeight(CANVAS_HEIGHT * zoom_value);
console.log(zoom_value);
}

function minus(){
  zoom_value-=1
canvas.setZoom(zoom_value);
canvas.setWidth(CANVAS_WIDTH * zoom_value);
canvas.setHeight(CANVAS_HEIGHT * zoom_value);
console.log(zoom_value);
}



// canvas2.setWidth(CANVAS_WIDTH * zoom_value);
// canvas2.setHeight(CANVAS_HEIGHT * zoom_value);

// everytime we resize change the height and width to the window size, and reset the
// center point  
// window.onresize = function () {
//     SCREEN_HEIGHT = canvas.setHeight = document.documentElement.scrollHeight;
//     SCREEN_WIDTH = canvas.setWidth = document.body.offsetWidth;    
//     HALF_WIDTH = SCREEN_WIDTH / 2;
//     HALF_HEIGHT = SCREEN_HEIGHT / 2;
//     console.log(SCREEN_HEIGHT)
//     console.log(SCREEN_WIDTH)
// };


// (function (img){ 
//    img.setWidth(200);
//    img.setHeight(200);
//    canvas.setBackgroundImage(img);
//    canvas.renderAll();
// })(fimg);




canvas.on('mouse:down', function(o){
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x-origX,
        height: pointer.y-origY,
        angle: 0,
        fill: 'rgba(0, 0, 255, 0.3)',
        transparentCorners: false
    });
    canvas.add(rect);


});

canvas.on('mouse:move', function(o){
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
    
    if(origX>pointer.x){
        rect.set({ left: Math.abs(pointer.x) });
    }
    if(origY>pointer.y){
        rect.set({ top: Math.abs(pointer.y) });
    }
    
    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });
    
    
    canvas.renderAll();
});

canvas.on('mouse:up', function(o){
  isDown = false;
});

// Add the image to canvas
// canvas.add(fabricImage);

 
  // fimg.set({
  //   left: 300,
  //   top: 0
  // });
  // fimg.scaleToHeight(300);
  // fimg.scaleToWidth(300);
  // canvas.add(fimg);


// var element = document.getElementById('canvas');
//  fimg.scaleToHeight(100);
//  fimg.scaleToWidth(500);
//  canvas.setBackgroundImage(fimg);
//  canvas.renderAll();



// (function (img){ 
//    img.setWidth(200);
//    img.setHeight(200);
//    canvas.setBackgroundImage(img);
//    canvas.renderAll();
// })(fimg);


// var rect_sel = canvas.getObjects().filter(obj => obj.type === 'rect')[0]

// Get the background image and crop it to the rectangle area
var bgImg = canvas.backgroundImage;
// var croppedImg = new fabric.Image(bgImg.getElement(), {
//   left: -rect_sel.left,
//   top: -rect_sel.top,
//   scaleX: bgImg.scaleX,
//   scaleY: bgImg.scaleY,
//   angle: bgImg.angle,
//   clipTo: function(ctx) {
//     ctx.rect(rect_sel.left, rect_sel.top, rect_sel.width, rect_sel.height);
//   }
// });

// canvas.add(croppedImg);



var t1 = new fabric.Textbox('MyText', {
  width: 150,
  top: 5,
  left: 5,
  fontSize: 16,
  textAlign: 'center',
  fixedWidth: 150
})


var myButton = document.getElementById('my-button');

var data_co;

myButton.addEventListener('click', function() {
  // var norects = canvas.getObjects().filter(obj => obj.type === 'rect')
  var rects = canvas.getObjects().filter(obj => obj.type === 'rect')
  // for (let i = 0, len = norects.length,rects = norects; i < len; i++) {
    var scaleFactor = bgImg.scaleX;

    // Calculate the rectangle coordinates and size in the original image space
    // var rectLeft = rect.left * scaleFactor;
    // var rectTop = rect.top * scaleFactor;
    // var rectWidth = rect.width * scaleFactor;
    // var rectHeight = rect.height * scaleFactor;

    console.log("bounding boxes rects",rects)

    const bounding_boxes = [];


    for (let x of rects) {
      var data_co = {
        rectLeft: x.left * scaleFactor,
        rectTop:  x.top * scaleFactor,
        rectWidth:  x.width * scaleFactor,
        rectHeight:  x.height * scaleFactor,
        };
      bounding_boxes.push(data_co)
    }

    processArray(rects)
    console.log("bounding boxes",bounding_boxes)

    // var data_co = {
    //   rectLeft: rects.left * scaleFactor,
    //   rectTop:  rects.top * scaleFactor,
    //   rectWidth:  rect.width * scaleFactor,
    //   rectHeight:  rect.height * scaleFactor,
    //   };
    

// Make an AJAX POST request to the Django server
    $.ajax({
    type: "POST",
    url: "image-process",
    data: JSON.stringify(bounding_boxes),
    // beforeSend: function (xhr){
    //   xhr.setRequestHeader('X-CSRFToken', csrftoken);
    // },
    contentType: "application/json",
    dataType: "json",
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
});
  
});


// console.log(data_co);

// var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();



// var data = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   message: "Hello, Django!"
// };



// // Add mycanvas to DOM
// $("#my-canvas-container").append('<canvas id="mycanvas"  width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '" ></canvas>');

// canvas2 = new fabric.Canvas("mycanvas", {
//     // some settings, whatever is needed
//     perPixelTargetFind: true,               
//     targetFindTolerance: 4,                 
//     preserveObjectStacking: true            
// });

// // Set canvas size according to my initial zoom_value
// canvas2.setZoom(zoom_value);
// canvas2.setWidth(CANVAS_WIDTH * zoom_value);
// canvas2.setHeight(CANVAS_HEIGHT * zoom_value);





// var tooltip = new fabric.Textbox('', {
//   left: rect.left,
//   top: rect.top - 30,
//   width: 100,
//   height: 30,
//   visible: false,
//   backgroundColor: 'white',
//   borderColor: 'black',
//   borderWidth: 1
// });


var something = [
  {name: 'rect1',
  left: 100,
  top:50
},
{name: 'rect2',
  left: 500,
  top:150
}
]


function tag(params) {
  params.forEach(function (value, i) {

      var div = document.createElement('div')
      div.className = "input-group"
      div.style.position = 'absolute'
      div.style.top = (value.top + value.height +5) + 'px'
      div.style.left = (value.left + 10) + 'px'
      div.style.width = '25%'
      // div.style.height = each.height + 'px'
      div.innerHTML = `<input type='text' class='form-control input-group-prepend' id='usr'><button type='button' class='btn btn-success btn-sm' id='tag-${i}'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check' viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg></button>`
    
      // var div = document.createElement('input')
      // div.className = each.name + 'input'
      // div.innerHTML = 'here'

      // var button = document.createElement('button');
      // button.type = 'button';
      // button.className = 'btn btn-success btn-sm';
      // button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>';
      // div.appendChild(button);

      var button = div.querySelector("button");
      console.log("button",button)
      button.addEventListener('click', function() {
        // code to execute when button is clicked
        // for example, you can call another function or do some other task
        nextLoop();
      });
      var node = document.querySelector('.play')
      node.appendChild(div)
  })
} 



async function processArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    var div = document.createElement('div')
    div.className = "input-group"
    div.style.position = 'absolute'
    div.style.top = (value.top + value.height +5) + 'px'
    div.style.left = (value.left + 10) + 'px'
    div.style.width = '25%'
    // div.style.height = each.height + 'px'
    div.innerHTML = `<input type='text' class='form-control input-group-prepend' id='usr'>
        <button type='button' class='btn btn-success btn-sm' id='tag-${i}'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check' viewBox='0 0 16 16'>
        <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/>
        </svg></button>`
    
      var node = document.querySelector('.play')
      node.appendChild(div)
      var tag_id = `tag-${i}`
      await waitForButtonClick(div,tag_id);
      var user_val = document.getElementById('usr').value
      console.log("user_val",user_val)
      console.log('input is given');
      node.removeChild(div)
    

  }
}

function waitForButtonClick(div,tag_id) {
  const btn = div.querySelector(`#${tag_id}`);
  return new Promise(resolve => {
    btn.addEventListener('click', resolve);
  });
}

