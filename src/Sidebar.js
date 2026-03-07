import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ setActiveTab }) {

const navigate = useNavigate();

const [theme,setTheme] = useState(localStorage.getItem("theme") || "dark");

useEffect(()=>{
document.body.setAttribute("data-theme",theme);
localStorage.setItem("theme",theme);
},[theme]);

const toggleTheme = ()=>{
setTheme(theme === "dark" ? "light" : "dark");
};

return(

<div className="sidebar">

<h2 className="logo">MeetAI</h2>

<button onClick={()=>navigate("/meeting")}>
Start Meeting
</button>

<button onClick={()=>setActiveTab("dashboard")}>
Dashboard
</button>

<button onClick={()=>setActiveTab("meetings")}>
Meeting History
</button>

<button onClick={()=>setActiveTab("reports")}>
Download Reports
</button>

<button onClick={toggleTheme}>
Appearance
</button>

</div>

);

}

export default Sidebar;