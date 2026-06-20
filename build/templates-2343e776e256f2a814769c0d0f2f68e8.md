(templates)=
# Structural and functional brain templates

Brain templates are the cornerstone of neuroimaging studies, providing a common reference space for aligning and comparing brain data across individuals.
To this end, we have developed the onavg (OpenNeuro Average) cortical surface template {cite:p}`feilong2024`, which is derived from high-quality MRI data of 1,031 individuals from the [OpenNeuro](https://openneuro.org) platform.

(onavg)=
## The onavg cortical surface template

````{card}
```{figure} 01_ico64.png
---
name: onavg_example
---
```
**Fig 1. Distribution of cortical vertices on different surface templates.**
Traditional templates, such as fsaverage and fsLR (fsavg and fslr in the figure, respectively), sample cortical vertices based on the spherical surface (bottom row), resulting in non-uniform distributions on the anatomical surface (top row).
The onavg template {cite:p}`feilong2024`, in contrast, **uniformly samples cortical vertices on the anatomical surface**.
````

Compared to traditional templates, the onavg template provides **better performance** for a wide range of neuroimaging analyses---including multivariate pattern classification (MVPC), representational similarity analysis (RSA), localizer contrast maps, and functional connectivity---as well as **faster computations**.

See the [paper](https://doi.org/10.1038/s41592-024-02346-y) and [project page](https://feilong.github.io/tpl-onavg/) for more information, including usage instructions and example code.

(hyperbrain)=
## Functional brain templates and the HyperBrain project

We are working with the [Haxby Lab](https://sites.dartmouth.edu/haxbylab/) at Dartmouth College on the [HyperBrain](https://sites.dartmouth.edu/hyperbrain/) project, which aims to create a high-quality functional brain template for [hyperalignment](hyperalignment.md) and other functional alignment methods.

Feilong will present some preliminary results at the [Society for Neuroscience (SfN) 2025](https://www.sfn.org/meetings/neuroscience-2025) conference in San Diego.
Stay tuned for more updates!

[Yuqi Zhang](https://pbs.dartmouth.edu/people/yuqi-zhang), a Ph.D. student in the Haxby Lab, is leading a project on optimizing functional brain templates for different age groups (e.g., children, adolescents, older adults) in order to improve hyperalignment performance.
See our preprint {cite:p}`zhang2025` for details.

## References

```{bibliography}
:filter: docname in docnames
:style: unsrt
```
