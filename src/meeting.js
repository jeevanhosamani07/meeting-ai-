import { useState, useRef,useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./Meeting.css";

function Meeting() {

const [transcript,setTranscript] = useState("");
const [summary,setSummary] = useState("");
const [actions,setActions] = useState("");
const [recording,setRecording] = useState(false);

const recognitionRef = useRef(null);
useEffect(() => {

return () => {

if (recognitionRef.current) {
recognitionRef.current.stop();
}

};

}, []);

const toggleRecording = () => {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Speech recognition not supported in this browser");
return;
}

if(!recording){

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = (event)=>{

let text="";

for(let i=0;i<event.results.length;i++){

text += event.results[i][0].transcript + " ";

}

setTranscript(text);

};

recognition.start();
recognitionRef.current = recognition;
setRecording(true);

}else{

recognitionRef.current.stop();
setRecording(false);

}

};

const generateSummary = async ()=>{

if(!transcript){
alert("Transcript is empty");
return;
}

try{

const response = await fetch("http://127.0.0.1:5000/summarize",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
text:transcript
})

});

const data = await response.json();

setSummary(data.summary);

const parts = data.summary.split("Action Items");

if(parts.length>1){
setActions(parts[1]);
}

const {data:userData} = await supabase.auth.getUser();

await supabase.from("meetings").insert([
{
user_id:userData.user.id,
transcript:transcript,
summary:data.summary
}
]);

}catch(error){

console.log(error);
alert("AI summary failed");

}

};

return(

<div className="meeting-container">

<h1 className="meeting-title">AI Meeting Room</h1>

<div className="audio-section">

<button
className={`audio-btn ${recording ? "recording" : ""}`}
onClick={toggleRecording}
>

<svg
xmlns="http://www.w3.org/2000/svg"
width="28"
height="28"
fill="currentColor"
viewBox="0 0 16 16"
>

<path d="M8 12a3 3 0 0 0 3-3V4a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z"/>

<path d="M5 10.5a.5.5 0 0 1 .5.5 2.5 2.5 0 0 0 5 0 .5.5 0 0 1 1 0 3.5 3.5 0 0 1-3 3.465V15h2a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h2v-.535A3.5 3.5 0 0 1 4.5 11a.5.5 0 0 1 .5-.5z"/>

</svg>

</button>

<p className="audio-label">
{recording ? "Recording..." : "Click to start recording"}
</p>

</div>

<div className="meeting-grid">

<div className="meeting-card">

<h2>Transcript</h2>

<textarea
value={transcript}
onChange={(e)=>setTranscript(e.target.value)}
rows="10"
/>

<button
className="ai-btn"
onClick={generateSummary}
>

Generate AI Summary

</button>

</div>

<div className="meeting-card">

<h2>AI Summary</h2>

<textarea
value={summary}
readOnly
rows="8"
/>

</div>

<div className="meeting-card">

<h2>Action Items</h2>

<textarea
value={actions}
readOnly
rows="6"
/>

</div>

</div>

</div>

);

}

export default Meeting;