import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { jsPDF } from "jspdf";
import "./Dashboard.css";

function Dashboard() {

const [activeTab, setActiveTab] = useState("dashboard");
const [meetings,setMeetings] = useState([]);
const [meetingCount,setMeetingCount] = useState(0);
const [user,setUser] = useState(null);
const [sidebarOpen,setSidebarOpen] = useState(false);
const[menuOpen,setMenuOpen] = useState(null);
const[tasks,setTasks] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

supabase.auth.getUser().then(({data})=>{
setUser(data.user);

if(data.user){
loadTasks(data.user.email);
}
});

const loadMeetings = async () => {

const {data,error} = await supabase
.from("meetings")
.select("*")
.order("created_at",{ascending:false});

if(data){
setMeetings(data);
setMeetingCount(data.length);
}

};

loadMeetings();

},[]);
const loadTasks = async (email) => {

const { data } = await supabase
.from("tasks")
.select("*")
.eq("user_email", email);

if(data){
setTasks(data);
}

};


const handleLogout = () => {
supabase.auth.signOut();
window.location.href="/login";
};


const downloadReport = (meeting)=>{

const doc = new jsPDF();

const today = new 
Date().toLocaleDateString();
doc.setFontSize(18);
doc.text("AI Meeting Report",20,20);

doc.setFontSize(12);
doc.text(`Date: ${today}`,20,30);


doc.text(" Meeting Summary:",20,40);
const summaryLines = doc.splitTextToSize(meeting.summary || "No summary available.",170);
doc.text(summaryLines,20,50);

doc.save("meeting-report.pdf");

};


const deleteMeeting = async(id)=>{
await supabase
.from("meetings")
.delete()
.eq("id",id);

setMeetings(meetings.filter(m => m.id !== id));
};


const renameMeeting = async(meeting)=>{

const newTitle = prompt("Enter new meeting title");

if(!newTitle) return;

await supabase
.from("meetings")
.update({ transcript:newTitle })
.eq("id",meeting.id);

setMeetings(
meetings.map(m =>
m.id === meeting.id ? {...m, transcript:newTitle} : m
)
);
};


const pinMeeting = (meeting)=>{

setMeetings([
meeting,
...meetings.filter(m => m.id !== meeting.id)
]);

};

return (

<div className="layout">

{/* NAVBAR */}

<div className="navbar">

<button
className="menu-btn"
onClick={()=>setSidebarOpen(!sidebarOpen)}
>
☰
</button>

<h2>MeetAI</h2>

</div>


{/* SIDEBAR */}

<div className={sidebarOpen ? "sidebar open" : "sidebar"}>

<button onClick={()=>navigate("/meeting")}>
Start Meeting
</button>

<button
className={activeTab === "dashboard" ? "active" : ""}
onClick={()=>setActiveTab("dashboard")}
>
Dashboard
</button>

<button
className={activeTab === "meetings" ? "active" : ""}
onClick={()=>setActiveTab("meetings")}
>
Meeting History
</button>

<button
className={activeTab === "reports" ? "active" : ""}
onClick={()=>setActiveTab("reports")}
>
Download Reports
</button>

<div className="sidebar-user">

<div className="avatar">
{user?.email?.charAt(0).toUpperCase()}
</div>

<p className="user-email">{user?.email?.email?.split("@")[0]}</p>

<button className="logout-btn" onClick={handleLogout}>
Logout
</button>

</div>


</div>



{/* MAIN CONTENT */}

<div className={sidebarOpen ? "main-content shift" : "main-content"}>


{activeTab === "dashboard" && (

<div className="dashboard-content">

<h1>Dashboard</h1>

<div className="stat-card">
<h3>Total Meetings</h3>
<p>{meetingCount}</p>
</div>


</div>

)}



{activeTab === "meetings" && (

<div>

<h1>Meeting History</h1>

{meetings.map(meeting => (

<div key={meeting.id} className="meeting-row">

<span className="meeting-title">
{meeting.transcript?.split(".")[0]}
</span>

<div className="menu">

<button className="dots">⋮</button>

<div className="menu-options">

<p onClick={()=>pinMeeting(meeting)}>Pin</p>
<p onClick={()=>renameMeeting(meeting)}>Rename</p>
<p onClick={()=>deleteMeeting(meeting.id)}>Delete</p>

</div>

</div>

</div>

))}

</div>

)}


{activeTab === "reports" && (

<div>

<h1>Download Reports</h1>

{meetings.map(meeting => (

<div key={meeting.id} className="card">

<p><b>Meeting Report</b></p>

<button
className="download-btn"
onClick={()=>downloadReport(meeting)}
>
Download Report
</button>

</div>

))}

</div>

)}

</div>





</div>

);

}

export default Dashboard;
