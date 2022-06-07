module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1/100': '1%'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-5deg)'
          },
          '50%': {
            transform: 'rotate(5deg)'
          },
        },

        wiggle2: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          },
        },

        wiggle3: {
          '0%, 100%': {
            transform: 'rotate(-8deg)'
          },
          '50%': {
            transform: 'rotate(8deg)'
          },
        },


        bounce2: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
          },
          '50%': {
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        wiggle2: 'wiggle2 2s ease-in-out infinite',
        wiggle3: 'wiggle3 3s ease-in-out infinite',
        bounce2: 'bounce2 5s ease-in-out infinite',
        bounce3: 'bounce2 3s ease-in-out infinite',
      },
      fontFamily: {
        serif: ['Inter', 'serif'],
        // serif: ['Spartan', 'serif'],
        // serif: ['Poppins', 'serif'],
      },
    },
  },
  plugins: [require("daisyui"),],
}
