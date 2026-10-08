'use strict';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const motionToggle = document.querySelector('#motion-toggle');
let activeModel = 'wan';
let paused = motionPreference.matches;
let userSelectedMotion = false;

function renderDemo() {
  tabs.forEach(tab => {
    const selected = tab.dataset.model === activeModel;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach(panel => {
    const active = panel.id === `panel-${activeModel}`;
    panel.hidden = !active;
    const img = panel.querySelector('img');
    const source = active && !paused ? img.dataset.animation : img.dataset.poster;
    if (img.getAttribute('src') !== source) img.src = source;
  });
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.setAttribute('aria-label', paused ? 'Play animated comparison' : 'Pause animated comparison');
  motionToggle.querySelector('.motion-label').textContent = paused ? 'Play' : 'Pause';
  motionToggle.querySelector('.pause-icon').textContent = paused ? '▶' : 'Ⅱ';
  document.querySelector('#original-demo').href = `assets/${activeModel}.gif`;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    activeModel = tab.dataset.model;
    renderDemo();
  });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    }
  });
});
motionToggle.addEventListener('click', () => {
  paused = !paused;
  userSelectedMotion = true;
  renderDemo();
});
motionPreference.addEventListener('change', event => {
  if (!userSelectedMotion) {
    paused = event.matches;
    renderDemo();
  }
});
renderDemo();

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
