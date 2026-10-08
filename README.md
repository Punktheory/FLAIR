# FLAIR

Project website for **Beyond Masks and Trajectories: Flow-Guided Latent Action Injection for Stable Surgical Video Generation**.

**[Project page](https://punktheory.github.io/FLAIR/)** · **[Paper](https://arxiv.org/abs/2610.09800)**

Tsz-Yui Qin*, Siyu Zhou*, Chi-Keung Tang, Yuxiang Nie†, Shu Yang†
The Hong Kong University of Science and Technology
\* Equal contribution. † Corresponding authors.

FLAIR learns action priors from optical flow during training and predicts those priors from text to guide surgical video generation. Only a text prompt is required at inference.

**Code — released soon.** This repository currently contains the project website, not the research implementation.

## Website

Static HTML, CSS, and JavaScript, deployed by GitHub Pages from the root of `main`. No build step is needed. To preview locally, serve this directory with any static web server.

- `index.html`: project content, publication metadata, and citation.
- `styles.css`: responsive layout.
- `script.js`: accessible demo tabs, animation control, and citation copy.
- `assets/`: original supplied GIF comparisons, static preview frames, and figures extracted from the paper.
- `citation.bib`: downloadable BibTeX.

Figures correspond to Figures 1–4 and Table 1 of arXiv:2610.09800v1. FVD percentages are reductions relative to each backbone's LoRA-only baseline in Table 1. The three GIF comparisons are the author-provided demonstrations, copied without modification. Static frames support reduced-motion preferences; only the selected demo animates.

## Citation

```bibtex
@misc{qin2026flair,
  title={Beyond Masks and Trajectories: Flow-Guided Latent Action
         Injection for Stable Surgical Video Generation},
  author={Tsz-Yui Qin and Siyu Zhou and Chi-Keung Tang
          and Yuxiang Nie and Shu Yang},
  year={2026},
  eprint={2610.09800},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2610.09800}
}
```
