import React from 'react';

function Footer() {
  return (
    <footer
      className="border-t text-[#e4e4e4] border-gray-800 min-h-50 backdrop-blur-2xl py-8 px-20 w-full mx-auto relative overflow-hidden"
      style={{
        background: 'url(/footer.png)',
        backgroundSize: 'cover',
      }}
    >
      <div className="pointer-events-none">
        {/* 1 — Thin starburst (yellow) */}
        <svg
          className="absolute top-4 left-6 w-30 h-30 -z-1 text-yellow-400 transform rotate-6 animate-spin animation-duration-[10000ms]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <g transform="translate(50,50)">
            {[...Array(12)].map((_, i) => (
              <polygon
                key={i}
                points="0,-44 3,-12 0,-6 -3,-12"
                transform={`rotate(${i * 30})`}
              />
            ))}
          </g>
        </svg>

        {/* 2 — Eight-point geometric star (purple) */}
        <svg
          className="absolute top-8 right-0 w-30 h-30 -z-1 text-purple-500 animate-bounce"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon points="50,8 62,38 94,38 68,58 78,92 50,72 22,92 32,58 6,38 38,38" />
        </svg>

        {/* 3 — Spiky saw/star (green) */}
        <svg
          className="absolute top-56 left-4 w-44 h-44 -z-1 text-green-500 rotate-3"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 12 L58 36 L82 36 L62 52 L70 76 L50 62 L30 76 L38 52 L18 36 L42 36 Z" />
        </svg>

        {/* 4 — Rounded 5-point star (orange) */}
        <svg
          className="absolute top-20 left-[20rem] w-24 h-24 -z-1 text-orange-400 rotate-20"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 11 L61 37 H88 L66 54 L75 84 L50 67 L25 84 L34 54 L12 37 H39 Z" />
        </svg>

        {/* 5 — Soft plus (pink) */}
        <svg
          className="absolute top-72 left-[26rem] w-28 h-28 -z-1 text-pink-400"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <rect x="40" y="8" width="20" height="84" rx="10" />
          <rect x="8" y="40" width="84" height="20" rx="10" />
        </svg>

        {/* 6 — Thick X (indigo) */}
        <svg
          className="absolute top-44 left-[33rem] w-28 h-28 -z-1 text-indigo-500 -rotate-8"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <rect
            x="26"
            y="12"
            width="20"
            height="76"
            rx="10"
            transform="rotate(45 36 50)"
          />
          <rect
            x="54"
            y="12"
            width="20"
            height="76"
            rx="10"
            transform="rotate(-45 64 50)"
          />
        </svg>

        {/* 7 — Folded kite (teal) */}
        <svg
          className="absolute top-10 left-[42rem] w-24 h-24 -z-1 text-teal-400 rotate-10"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon points="50,10 80,50 50,90 20,50" />
          <polygon opacity="0.9" points="50,20 62,50 50,80 38,50" />
        </svg>

        {/* 8 — Compass star (red) */}
        <svg
          className="absolute top-64 left-[48rem] w-24 h-24 -z-1 text-red-500 -rotate-18"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 5 L59 45 L95 50 L59 55 L50 95 L41 55 L5 50 L41 45 Z" />
        </svg>

        {/* 9 — Organic flower (sky) */}
        <svg
          className="absolute top-80 left-[56rem] w-28 h-28 -z-1 text-sky-400 rotate-4"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <g transform="translate(50,50)">
            {[0, 30, 60, 90, 120, 150].map(d => (
              <ellipse
                key={d}
                rx="7"
                ry="20"
                transform={`rotate(${d}) translate(0,-10)`}
              />
            ))}
            <circle r="6" />
          </g>
        </svg>

        {/* 10 — Rounded pinwheel (lime) */}
        <svg
          className="absolute top-24 left-[65rem] w-24 h-24 -z-1 text-lime-400 -rotate-6"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 10 C58 18 68 20 74 28 C70 40 58 48 50 60 C42 48 30 40 26 28 C32 20 42 18 50 10 Z" />
          <path d="M50 90 C42 82 32 80 26 72 C30 60 42 52 50 40 C58 52 70 60 74 72 C68 80 58 82 50 90 Z" />
        </svg>
      </div>

      <div className="inset-0 absolute -z-2 backdrop-blur-[3px]" />
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
          <p className="text-center mt-10 hover:text-white">
            Designed & Built by Abhilash
          </p>
        </div>
      </div>
      <p className="text-center mt-4 hover:text-white">
        © Abhilash Reddy {new Date().getFullYear()}. All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
