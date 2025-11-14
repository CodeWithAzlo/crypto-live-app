import React from "react";
import "./../styles/components.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Crypto Local Live App Tracker — built By Codewithazlo</p>
    </footer>
  );
}
