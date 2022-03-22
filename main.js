objects=[];
status1="";

function setup(){
    canvas = createCanvas(480,360);
    canvas.center();
    video.hide();
}
function preload(){
    video=createVideo("video.mp4");
}
function draw(){
    image(video,0,0,480,360);

    if(status1 != ""){
        objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length; i++){
            document.getElementById("status").innerHTML="Staus: Objects Detected"
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are "+objects.length;                              
            fill("#ff0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#ff0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function Start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status1=true;
    video.loop();
    video.volume(1);
    video.speed(1);
}
function gotResult(error,results){
    if(error){
        console.log(error);

    }
    else{
        console.log(results);
        objects=results
    }
}