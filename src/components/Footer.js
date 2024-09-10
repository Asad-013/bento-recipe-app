// Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Bento Recipe Finder. All rights reserved. Made by Asad</p>
    </footer>
  );
}

export default Footer;
