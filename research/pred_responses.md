(pred_responses)=
# Predicting individualized brain responses

## Topographic idiosyncrasies

Different brains encode the same information in distinct ways {cite:p}`haxby2020`.
Across individuals, the same brain function may be implemented in different anatomical locations, while the same anatomical region may support different functions.
These idiosyncrasies in the correspondence between function and anatomy---often referred to as topographic idiosyncrasies---pose a major challenge for studying brain function across individuals.

````{card}
```{figure} topographic_idiosyncrasies.png
---
scale: 27%
align: left
name: topographic_idiosyncrasies
---
```
**Fig 1. Topographic idiosyncrasies.**
Within each brain, response patterns to a given stimulus are reliable across independent measurements (top and bottom rows).
The brain shows distinct response patterns to different stimuli (left and middle columns).
However, across brains, response patterns to the same stimulus differ (left and right columns).
See {cite:t}`feilong2025` for a discussion of how these idiosyncrasies can be resolved
````

## Predicting individualized brain responses

To study these functional regions, rather than anatomical locations, researchers often use functional localizers to identify these regions in each individual brain.
However, acquiring such data can be challenging in many studies.
[Hyperalignment](hyperalignment.md) {cite:p}`haxby2020`, a functional alignment method, provides a powerful solution to this problem.
**Hyperalignment establishes functional correspondence across individuals**, allowing for projecting fMRI data from one brain to another.
The projected data, particularly when aggregated across multiple source individuals, can serve as an **accurate prediction** of the target individual's brain responses to the same stimuli {cite:p}`jiahui2020,jiahui2023elife,feilong2023,guntupalli2016,haxby2011`.

````{card}
```{figure} INT_pred.png
---
align: left
name: INT_pred
---
```
**Fig 2. Predicting individualized brain responses using the INT model.**
The top row shows the face-selectivity map and eccentricity map based on the localizer scans.
The bottom row shows the predicted maps using the [Individualized Neural Tuning (INT) model](hyperalignment.md) {cite:p}`feilong2023`.
Note that the localizer-based maps are not noise-free, and the differences between the predicted and localizer-based maps partly reflect noise in the localizer data.
````

## References

```{bibliography}
:filter: docname in docnames
:style: unsrt
```
