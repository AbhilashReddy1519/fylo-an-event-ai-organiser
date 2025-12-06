import React from 'react';

function Footer() {
  return (
    <footer
      className="border-t text-[#807f80] border-gray-800 min-h-50 backdrop-blur-2xl py-8 px-20 w-full mx-auto relative"
      style={{
        background: 'url(/footer.png)',
        backgroundSize: 'cover',
      }}
    >
      <div className="inset-0 absolute -z-1 backdrop-blur-[3px]" />
      <div className="grid md:grid-cols-2 md:grid-rows-1 sm:grid-rows-2 sm:grid-cols-1 mx-auto">
        <div className="px-8 flex flex-col justify-center gap-8">
          <div className="space-y-4">
            <h1 className="text-7xl hover:text-white">Currently building</h1>
            <p className="ml-1 block">
              Open for impactful collaborations or for exciting projects
            </p>
          </div>
          <p className="ml-1">
            Learning fast. Shipping faster. Turning ideas into products with
            real impact. Focused on building boldly and improving daily.
          </p>
        </div>
        <div className="px-6 py-8">
          <div className="grid md:grid-cols-2 gap-2 md:grid-rows-1 sm:grid-rows-2 sm:grid-cols-1 mx-auto">
            <div>
              <h1 className="text-2xl hover:text-white">Services</h1>
              <ul className="list-none text-sm">
                <li>Full Stack Development</li>
                <li>Cloud & Devops</li>
                <li>Ui Engineering</li>
                <li>System Desing & DSA</li>
              </ul>
            </div>
            <div className="flex flex-col gap-10 justify-between">
              <div>
                <h1 className="text-2xl hover:text-white">Connect</h1>
                <ul className="list-none text-sm">
                  <li>LinkedIn</li>
                  <li>GitHub</li>
                </ul>
              </div>
              <div>
                <h1 className="text-2xl hover:text-white">Get in touch</h1>
                <p>abhilashreddy6300@gmail.com</p>
              </div>
            </div>
          </div>
          <p className="text-center mt-10 hover:text-white">Designed & Built by Abhilash</p>
        </div>
      </div>
      <p className="text-center mt-4 hover:text-white">
        © Abhilash Reddy {new Date().getFullYear()}. All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
