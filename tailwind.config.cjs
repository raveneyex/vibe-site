/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        noir: {
          900: '#0a0b0d',
          800: '#0f1115',
        },
        neon: {
          cyan: '#2de2e6',
          green: '#00ffa3',
          magenta: '#ff2a6d',
          red: '#ff3864',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        ui: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 1px #2de2e6, 0 0 8px rgba(45,226,230,0.6), 0 0 24px rgba(45,226,230,0.35)',
        'neon-magenta': '0 0 1px #ff2a6d, 0 0 8px rgba(255,42,109,0.6), 0 0 24px rgba(255,42,109,0.35)',
        'neon-purple': '0 0 1px #a855f7, 0 0 8px rgba(168,85,247,0.6), 0 0 24px rgba(168,85,247,0.35)',
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(.2,.8,.2,1)',
      },
    },
  },
  plugins: [],
};
