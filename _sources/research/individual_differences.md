(individual_differences)=
# Brain differences and their correlates

A key focus of our lab is understanding individual differences in the human brain, including:
- how brains differ from each other;
- how these differences develop across the lifespan; and
- how they relate to variability in behavior, cognition, and clinical outcomes.


## Fine-grained brain functional organization

````{card}
```{figure} coarse_vs_fine.png
---
scale: 35%
align: left
name: coarse_vs_fine0
---
```
**Fig 1. Coarse- vs. fine-grained information.**
Coarse-grained information is derived by spatially smoothing or averaging fMRI data within regions, reflecting their overall activity or connectivity (centimeter scale).
Fine-grained information, in contrast, captures detailed vertex-by-vertex or voxel-by-voxel patterns within regions (millimeter scale).
````

We are particularly interested in individual differences in fine-grained brain functional organization --- the detailed spatial patterns of brain activity and connectivity at the voxel or vertex level. Compared to coarse-grained differences (e.g., region-level averages), these fine-grained differences are 
1. **more reliable** across independent data and more congruent across functional indices {cite:p}`feilong2018`;
2. **more predictive** of intelligence and other cognitive abilities {cite:p}`feilong2021`;
3. **more experience-driven**, potentially reflecting learning and training effects {cite:p}`busch2024`.

````{card}
```{figure} g_fine_vs_coarse.png
---
scale: 40%
align: left
name: g_fine_vs_coarse
---
```
**Fig 2. Predicting general intelligence (_g_).**
Fine-grained functional connectivity profiles (y-axis, blue histogram) are markedly better predictors of general intelligence than coarse-grained connectivity profiles (x-axis, green histogram) across different brain systems, accounting for **twice as much variance in _g_**. Adapted from {cite:t}`feilong2021 {Figure 3}`. Similar effects are observed for both task- and resting-state connectivity, and across different cognitive abilities {cite:p}`feilong2021`.
````

These fine-grained differences are often obscured by individual variability in [anatomical--functional correspondence](pred_responses.md) and cannot be properly studied using traditional alignment methods.
We use [hyperalignment](hyperalignment.md) {cite:p}`haxby2020` and the [Individualized Neural Tuning (INT) model](hyperalignment.md) {cite:p}`feilong2023` to resolve these idiosyncrasies and reveal the individual differences in fine-grained functional organization.

## References

```{bibliography}
:filter: docname in docnames
:style: unsrt
```
