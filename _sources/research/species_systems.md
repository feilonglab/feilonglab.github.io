(species_systems)=
# Comparisons across species and systems

The same function can be implemented in different ways {cite:p}`haxby2020`.
To understand the general principles of brain functional organization, we examine how the same function is instantiated in different species (e.g., humans and non-human primates) and systems (e.g., brains and artificial neural networks).

## Modeling human brains using deep neural networks

Are deep neural networks (DNNs) good models of the human face processing system?
To address this question, we systematically compared how 707 face video clips are represented in human brains and in DNNs {cite:p}`jiahui2023pnas`.
We found **systematic and meaningful correlations** between human brain representations and DNN representations throughout the face processing network.
However, DNN representations only explain **a portion of variance in human brain representations**, suggesting the existence of differences between biological and artificial face processing systems.


````{card}
```{figure} face_dnn.png
---
align: left
name: face_dnn
---
```
**Fig 1. Comparison between human brain and DNN representations.**
The representation of a face is characterized as a vector in each brain region or DNN layer.
Based on the similarities between these vectors, we constructed representational dissimilarity matrices (RDMs) for each brain region and DNN layer and systematically compared them.
````

(monkey_kingdom)=
## Shared and species-specific neural responses

To what extent can neuroscientific findings based on non-human primates be generalized to humans, and vice versa?
In collaboration with Drs. James V. Haxby, Maria Ida Gobbini, Wim Vanduffel, Qi Zhu, and Won Mok Shim, we analyzed fMRI data collected from both humans and monkeys while they watched the same movie, *Monkey Kingdom*, and assessed the shared and species-specific components of their neural responses. See our [OHBM poster](/_static/Feilong_2024_OHBM_poster.pdf) for more details.


````{card}
```{figure} mvvp.png
---
align: left
name: mvvp
---
```
**Fig 2. Shared and species-specific neural responses.**
The shared components explain a substantial portion of variance in both human (top row) and monkey (bottom row) neural responses.
In contrast, species-specific components explain substantial variance only in their corresponding species, but not in the other.
````

## References

```{bibliography}
:filter: docname in docnames
:style: unsrt
```
