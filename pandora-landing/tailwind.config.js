/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Pandora
        'pandora': {
          'violet': '#6B46C1',      // Violet mystère (primaire)
          'gold': '#F59E0B',        // Or précieux (secondaire)
          'blue': '#1E40AF',        // Bleu nuit (tertiaire)
          'rose': '#EC4899',        // Rose culturel
          'green': '#10B981',       // Vert naturel
          'orange': '#F97316',      // Orange énergie
          'gray': {
            'elegant': '#374151',   // Gris élégant
            'dark': '#111827',      // Noir sophistiqué
          }
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(107, 70, 193, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(107, 70, 193, 0.8)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'pandora': '0 10px 25px rgba(107, 70, 193, 0.15)',
      },
    },
  },
  plugins: [],
}
