  class CatImage extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
          <div id="img-wrap"></div>
          <button id="btn">Get a Random Cat!</button>
    <style>
        button {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      font-size: 16px;
      background: #008CBA;
      border: none;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
    button:hover {
      background: #005f73;
    }
    </style>
        `;
      }
      connectedCallback() {
        this.btn = this.shadowRoot.getElementById('btn');
        this.wrap = this.shadowRoot.getElementById('img-wrap');
        this.btn.addEventListener('click', () => this.load());
        document.addEventListener('keydown', e => {
          if (e.key === 'e' && this.hasAttribute('fullscreen')) {
            document.documentElement.requestFullscreen?.();
          }
        });
        this.load();
      }

      load() {
        fetch('https://cataas.com/cat?type=medium')
          .then(r => r.blob())
          .then(b => {
            const url = URL.createObjectURL(b);
            this.wrap.innerHTML = `<img src="${url}" alt="Random Cat">`;
          });
      }
    }

    customElements.define('cat-image', CatImage);
