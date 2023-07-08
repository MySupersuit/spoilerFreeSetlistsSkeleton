/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		spacing: {
			px: '1px',
			0: '0',
			1: '4px',
			2: '8px',
			3: '12px',
			4: '16px',
			5: '20px',
			6: '24px',
			7: '28px',
			8: '32px',
			9: '36px',
			10: '40px',
			11: '44px',
			12: '48px',
			13: '52px',
			14: '56px',
			15: '60px',
			16: '64px',
			17: '68px',
			18: '72px',
			19: '76px',
			20: '80px'
		},
		largeSpacing: {
			24: '96px',
			32: '128px',
			40: '160px',
			48: '192px',
			64: '256px',
			96: '384px',
			128: '512px',
			192: '768px',
			224: '896px',
			256: '1024px'
		},
		extend: {}
	},
	plugins: []
};
