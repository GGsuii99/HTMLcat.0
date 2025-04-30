class MeowTag extends HTMLElement {
    connectedCallback() {
      const width = this.getAttribute('width');
      const height = this.getAttribute('height');
      const isFullscreen = this.hasAttribute('fullscreen') || this.getAttribute('fullscreen') !== null;

      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';

      const iframe = document.createElement('iframe');
      iframe.src = "https://pointless-projects.pages.dev/catvid";

      if (isFullscreen) {
        iframe.style.width = "100vw";
        iframe.style.height = "100vh";

        window.addEventListener('keydown', (e) => {
          if (e.key.toLowerCase() === 'f') {
            if (!document.fullscreenElement) {
              iframe.requestFullscreen();
            }
          }
        });
      } else {
        iframe.width = width || "600";
        iframe.height = height || "400";
      }

      const overlay = document.createElement('div');
      overlay.className = 'meow-overlay';
      overlay.oncontextmenu = (e) => e.preventDefault(); // Block right-click

      wrapper.appendChild(iframe);
      wrapper.appendChild(overlay);

      this.replaceWith(wrapper);
    }
  }

  customElements.define('meow-tag', MeowTag);

  // Replace all <meow> tags
  document.querySelectorAll('meow').forEach(el => {
    const newEl = document.createElement('meow-tag');
    for (const attr of el.attributes) {
      newEl.setAttribute(attr.name, attr.value);
    }
    el.replaceWith(newEl);
  });
