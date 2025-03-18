function randomInt(min = -5, max = 5) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil)
}

function randomFloat(min = -5, max = 5) {
  return Math.random() * (max - min) + min;
}

class SnowOverlay extends HTMLElement {
  static observedAttributes = ['count', 'scale'];
  constructor() { super(); }
  connectedCallback() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && !mediaQuery.matches) {

      let count = this.hasAttribute('count') ? Number(this.getAttribute('count')) : 12;
      const scale = this.hasAttribute('scale') ? parseFloat(this.getAttribute('scale')) : 1.0;

      const animationVariations = 12;
      const flakeMinSize = 0.25 * scale;
      const flakeRegSize = 1.00 * scale;

      const shadowRoot = this.attachShadow({ mode: 'open' });

      const overlayContainer = document.createElement('div');
      overlayContainer.setAttribute('class', 'snowflakeOverlay');
      shadowRoot.appendChild(overlayContainer);

      if (count === 0) {
        count = Math.max(Math.ceil(window.innerWidth / 30), animationVariations);
      }

      for (let i = 1; i <= count; i++) {
        let flakeContainer = document.createElement('div');
        flakeContainer.setAttribute('class', 'snowflake');
        overlayContainer.appendChild(flakeContainer);

        let flakeContent = document.createElement('div');
        flakeContent.innerText = '❅';
        flakeContainer.appendChild(flakeContent);
      }

      let styleContent = `
            .snowflakeOverlay {
                position: fixed;
                inset: 0;
                width: 99vw;
                height: 99vh;
                z-index: 1000;
                pointer-events: none;
            }
            .snowflake {
                color: #fff;
                font: ${flakeRegSize}em Arial, sans-serif;
                text-shadow: 0 0 5px #000;
                position: fixed;

                & { animation: snowflakes-shake 3s ease-in-out infinite running; }
                * { animation: snowflakes-fall 10s linear infinite running; }
            }

            @keyframes snowflakes-fall {
                0% { transform: translateY(0); }
                100% { transform: translateY(125vh); }
            }
            @keyframes snowflakes-shake {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(80px); }
            }
        `;

      styleContent += '.snowflake {\n';
      for (let i = 1; i <= count; i++) {
        if (i % animationVariations === 1) styleContent += `
                &:nth-of-type(${i}) { font-size: ${flakeMinSize + randomFloat(flakeMinSize, flakeRegSize)}em; top: ${randomInt(-25, -10)}%; left: ${25 + randomInt()}%; animation-delay: ${0 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${2 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 2) styleContent += `
                &:nth-of-type(${i}) { top: ${randomInt(-25, -10)}%; left: ${65 + randomInt()}%; animation-delay: ${2.5 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${4 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 3) styleContent += `
                &:nth-of-type(${i}) { top: ${randomInt(-25, -10)}%; left: ${10 + randomInt()}%; }
                &:nth-of-type(${i}), &:nth-of-type(${i}) * { animation-delay: ${1 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 4) styleContent += `
                &:nth-of-type(${i}) { top: ${randomInt(-25, -10)}%; left: ${90 + randomInt()}%; animation-delay: ${1.5 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${3 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 5) styleContent += `
                &:nth-of-type(${i}) { font-size: ${flakeMinSize + randomFloat(flakeMinSize, flakeRegSize)}em; top: ${randomInt(-25, -10)}%; left: ${40 + randomInt()}%; }
                &:nth-of-type(${i}), &:nth-of-type(${i}) * { animation-delay: ${2 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 6) styleContent += `
                &:nth-of-type(${i}) { top: ${randomInt(-25, -10)}%; left: ${70 + randomInt()}%; animation-delay: ${1 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${2.5 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 7) styleContent += `
                &:nth-of-type(${i}) { font-size: ${flakeMinSize + randomFloat(flakeMinSize, flakeRegSize)}em; top: ${randomInt(-25, -10)}%; left: ${1 + randomInt()}%; }
                &:nth-of-type(${i}), &:nth-of-type(${i}) * { animation-delay: ${0 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 8) styleContent += `
                &:nth-of-type(${i}) { font-size: ${flakeMinSize + randomFloat(flakeMinSize, flakeRegSize)}em; top: ${randomInt(-25, -10)}%; left: ${80 + randomInt()}%; animation-delay: ${0 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${1 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 9) styleContent += `
                &:nth-of-type(${i}) { top: ${randomInt(-25, -10)}%; left: ${30 + randomInt()}%; animation-delay: ${2 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${4 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 10) styleContent += `
                &:nth-of-type(${i}) { top: ${randomInt(-25, -10)}%; left: ${50 + randomInt()}%; animation-delay: ${3 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${8 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 11) styleContent += `
                &:nth-of-type(${i}) { font-size: ${flakeMinSize + randomFloat(flakeMinSize, flakeRegSize)}em; top: ${randomInt(-25, -10)}%; left: ${20 + randomInt()}%; animation-delay: ${0.5 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${0.6 + randomFloat()}s; }
            `;
        else if (i % animationVariations === 0) styleContent += `
                &:nth-of-type(${i}) { font-size: ${flakeMinSize + randomFloat(flakeMinSize, flakeRegSize)}em; top: ${randomInt(-25, -10)}%; left: ${60 + randomInt()}%; animation-delay: ${2 + randomFloat()}s; }
                &:nth-of-type(${i}) * { animation-delay: ${6 + randomFloat()}s; }
            `;
      }
      styleContent += '}\n';

      const style = document.createElement('style');
      style.textContent = styleContent;
      shadowRoot.appendChild(style);
    }
  }
}

customElements.define('snow-overlay', SnowOverlay);