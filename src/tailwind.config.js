// tailwind.config.js
const { plugin } = require('twrnc');

module.exports = {
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                'backdrop-blur' : {
                    filter: 'blur(8px)'
                },
                'backdrop-blur-lg' : {
                    filter: 'blur(16px)'
                },
                'backdrop-blur-3xl' : {
                    filter: 'blur(64px)'
                }
            });
        }),
    ],
};