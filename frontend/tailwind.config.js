import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern': "url('/img/hero-pattern.svg')", 
				'footer-texture': "url('/img/footer-texture.png')", 
			  }
		},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			"light",
			{
				black: {
					...daisyUIThemes["black"],
					primary: "rgb(29, 0, 0)",
					secondary: "rgb(24, 24, 24)",
				},
			},
		],
	},
};