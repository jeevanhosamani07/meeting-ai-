import { useState } from "react";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const meetings = [
    { id: 1, title: "Client Meeting - Feb 28" },
    { id: 2, title: "Team Sync - March 1" }
  ];

  const summaries = [
    { id: 1, title: "Client Meeting Summary" },
    { id: 2, title: "Team Sync Summary" }
  ];

  const handleLogout = () => {
    window.location.href = "/login";
  };

const createChat = async () => {
  console.log("New Chat button clicked");

  const { data, error } = await supabase
    .from("chats")
    .insert([
      {
        user_id: "demo-user",
        title: "New Meeting Chat"
      }
    ])
    .select();

  if (error) {
    console.log("Error creating chat:", error);
  } else {
    console.log("Chat created:", data);
  }

};
  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>MeetAI</h2>
        <button onClick={createChat}>New Chat</button>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("meetings")}>Meeting History</button>
        <button onClick={() => setActiveTab("summaries")}>Summary History</button>
        <button onClick={() => setActiveTab("reports")}>Download Reports</button>
      </div>

      {/* Main Content */}
      <div className="main">

        {/* Top Bar */}
        <div className="topbar">
          <div></div>

          <div className="user-section">
            <span onClick={() => setDropdownOpen(!dropdownOpen)}>
              Jeevan ▾
            </span>

            {dropdownOpen && (
              <div className="dropdown">
                <p>Profile</p>
                <p>Settings</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="content">

          {activeTab === "dashboard" && (
            <div>
              <h1>Welcome to Meeting Intelligence</h1>
              <p>This is your main dashboard.</p>
            </div>
          )}

          {activeTab === "meetings" && (
            <div>
              <h1>Meeting History</h1>
              {meetings.map(meeting => (
                <div key={meeting.id} className="card">
                  {meeting.title}
                </div>
              ))}
            </div>
          )}

          {activeTab === "summaries" && (
            <div>
              <h1>Summary History</h1>
              {summaries.map(summary => (
                <div key={summary.id} className="card">
                  {summary.title}
                </div>
              ))}
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <h1>Download Reports</h1>
              <div className="card">
                <button className="download-btn">
                  Download Latest Report
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;