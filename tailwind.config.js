/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        pine: '#0B3D2E',
        'pine-ink': '#082B21',
        blue: '#1E5EFF',
        ink: '#0B0B0B',
        muted: '#5F5F5F',
        line: '#E8E8E8',
        soft: '#F6F6F6',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Liberation Sans', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'h1': ['42px', { lineHeight: '1.12', letterSpacing: '-0.045em', fontWeight: '900' }],
        'h2': ['22px', { lineHeight: '1.2', letterSpacing: '-0.03em', fontWeight: '800' }],
        'h3': ['12px', { lineHeight: '1.4', letterSpacing: '0.10em', fontWeight: '900' }],
      },
      borderRadius: {
        'card': '14px',
      },
    },
  },
  plugins: [],
}
