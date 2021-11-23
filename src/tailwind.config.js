// tailwind.config.js
const { plugin } = require('twrnc');

module.exports = {
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                'dark-green': {
                    'backgroundColor': 'rgb(23, 46, 35)'
                },
            });
        }),
    ],
};