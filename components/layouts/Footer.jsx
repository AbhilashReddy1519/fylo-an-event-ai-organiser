import React from 'react';

function Footer() {
  return (
    <footer
      className="border-t border-gray-800 py-8 px-20 w-full mx-auto"
      style={{
        background: 'url(/footer.png)',
        backgroundSize: 'cover',
      }}
    >
      {/* TODO: Add footer content (links, social icons, etc.) */}
        <p>© Abhilash Reddy {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
