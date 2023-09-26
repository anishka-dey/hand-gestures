prediction_1="";
prediction_2="";

Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality:100
});

camera= document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ji7eurhF_/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data1=tospeak;
    var utterthis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterthis);
}

function prediction(){
    img_cap=document.getElementById("captured_image");
    classifier.classify(img_cap, gotResult);
}

function gotResult(error, result){
    if (error){
        console.log(error);
    }
    else{
        console.log(result);
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        document.getElementById("emotion1").innerHTML=result[0].label;
        document.getElementById("emotion2").innerHTML=result[1].label;
        tospeak="";
        if (prediction_1=="Bye Bye"){
            tospeak="See you later!";
        }
        if (prediction_1=="Very Nice"){
            tospeak="That is superb!";
        }
        if (prediction_1=="Victorious"){
            tospeak="I win, you lose.";
        }
        if (prediction_1=="Call me?"){
            tospeak="Will you ever call me?";
        }
        if (prediction_1=="Got it"){
            tospeak="You got it.";
        }
        if (prediction_1=="Fist bump"){
            tospeak="I'm going punch your face.";
        }
        speak();
        if (result[0].label=="Bye Bye"){
            document.getElementById("emoji1").innerHTML="&#128075;";
        }
        if (result[0].label=="Very Nice"){
            document.getElementById("emoji1").innerHTML="&#128076;";
        }
        if (result[0].label=="Victorious"){
            document.getElementById("emoji1").innerHTML="&#9996;";
        }
        if (result[0].label=="Call me?"){
            document.getElementById("emoji1").innerHTML="&#129305;";
        }
        if (result[0].label=="Got it"){
            document.getElementById("emoji1").innerHTML="&#128077;";
        }
        if (result[0].label=="Fist bump"){
            document.getElementById("emoji1").innerHTML="&#128074;";
        }
        if (result[1].label=="Bye Bye"){
            document.getElementById("emoji2").innerHTML="&#128075;";
        }
        if (result[1].label=="Very Nice"){
            document.getElementById("emoji2").innerHTML="&#128076;";
        }
        if (result[1].label=="Victorious"){
            document.getElementById("emoji2").innerHTML="&#9996;";
        }
        if (result[1].label=="Call me?"){
            document.getElementById("emoji2").innerHTML="&#129305;";
        }
        if (result[1].label=="Got it"){
            document.getElementById("emoji2").innerHTML="&#128077;";
        }
        if (result[1].label=="Fist bump"){
            document.getElementById("emoji2").innerHTML="&#128074;";
        }
    }

}