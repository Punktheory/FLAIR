'use strict';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const demos = [...document.querySelectorAll('.demo-image')];
const motionToggle = document.querySelector('#motion-toggle');
const demoState = new Map(demos.map(button => [button, motionPreference.matches]));
let motionChangedByUser = false;

function renderDemos() {
  demos.forEach(button => {
    const paused = demoState.get(button);
    const img = button.querySelector('img');
    const source = paused ? img.dataset.poster : img.dataset.animation;
    if (img.getAttribute('src') !== source) img.src = source;
    const title = button.closest('figure').querySelector('h3').textContent;
    button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${title} comparison`);
    button.setAttribute('aria-pressed', String(paused));
  });
  const allPaused = [...demoState.values()].every(Boolean);
  motionToggle.textContent = allPaused ? 'Play all' : 'Pause all';
  motionToggle.setAttribute('aria-label', allPaused ? 'Play all animations' : 'Pause all animations');
  motionToggle.setAttribute('aria-pressed', String(allPaused));
}

demos.forEach(button => {
  button.addEventListener('click', () => {
    motionChangedByUser = true;
    demoState.set(button, !demoState.get(button));
    renderDemos();
  });
});

motionToggle.addEventListener('click', () => {
  motionChangedByUser = true;
  const allPaused = [...demoState.values()].every(Boolean);
  demos.forEach(button => demoState.set(button, !allPaused));
  renderDemos();
});

motionPreference.addEventListener('change', event => {
  if (!motionChangedByUser) {
    demos.forEach(button => demoState.set(button, event.matches));
    renderDemos();
  }
});

renderDemos();

const copyButton = document.querySelector('#copy-citation');
copyButton.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);
    copyButton.textContent = 'Copied!';
    status.textContent = 'BibTeX citation copied to clipboard.';
    window.setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; }, 2000);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyButton.textContent = 'Citation selected';
    status.textContent = 'Automatic copy is unavailable. Copy the selected citation or use Download .bib.';
  }
});
