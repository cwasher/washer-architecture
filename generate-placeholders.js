const fs = require('fs');

function createSVG(width, height, bgColor, text, textColor = '#fff') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="${textColor}" opacity="0.6">${text}</text>
</svg>`;
}

const projects = [
  { dir: 'cedar-ridge-residence', color: '#8B7355', label: 'Cedar Ridge' },
  { dir: 'elm-street-renovation', color: '#6B7B6E', label: 'Elm Street' },
  { dir: 'bentonville-townhomes', color: '#7B8794', label: 'Townhomes' },
  { dir: 'ozark-brewing-taproom', color: '#8B6F5E', label: 'Ozark Brewing' },
];

projects.forEach(({ dir, color, label }) => {
  const base = `public/images/projects/${dir}`;
  fs.writeFileSync(`${base}/cover.svg`, createSVG(1200, 900, color, label));
  fs.writeFileSync(`${base}/01.svg`, createSVG(1200, 800, color, `${label} — Interior`));
  fs.writeFileSync(`${base}/02.svg`, createSVG(1200, 800, color, `${label} — Detail`));
  fs.writeFileSync(`${base}/03.svg`, createSVG(1200, 800, color, `${label} — Exterior`));
});

console.log('Placeholders generated.');
