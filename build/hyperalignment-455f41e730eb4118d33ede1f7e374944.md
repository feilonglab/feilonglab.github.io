(hyperalignment)=
# Hyperalignment and the INT model

To analyze fMRI data from multiple brains---including both their commonalities and differences---it is essential to establish functional correspondence across individuals.
**Hyperalignment** {cite:p}`haxby2020` is a functional alignment method that establishes such correspondence, based on either brain responses to the same stimuli {cite:p}`haxby2011,guntupalli2016` or on functional connectivity profiles {cite:p}`guntupalli2018`.
The **Individualized Neural Tuning (INT) model** {cite:p}`feilong2023` builds upon hyperalignment to model individualized brain functional organization based on a shared template.

## Procrustes hyperalignment

```{margin} Improper rotation
The rotation used in Procrustes hyperalignment can be an *improper* rotation, which may include a reflection. Both rotations and reflections are orthogonal transformations that preserve distances and angles between points.
```

Procrustes hyperalignment {cite:p}`haxby2011` is based on the solution to the orthogonal Procrustes problem.
It finds a **high-dimensional rotation** in the feature space to align the brain responses of different individuals into a common space while preserving the representational geometry.

```{admonition} General figure explanation
For the two schematic figures below:
- The top and bottom rows denote two different individuals.
- **Left column**: The data matrix of their brain responses, which contains brain responses to 3 stimuli (3 rows) measured at 2 vertices (2 columns).
- **Middle column**: The feature space, where each dimension corresponds to a vertex, and each point corresponds to the brain response pattern to a stimulus.
- **Right column**: The representational geometry, which characterizes the relationships between different stimuli based on the similarities between their response patterns.

The blue and orange triangles denote the response patterns in the two individuals, respectively.
The gray triangle denotes the common space, which is the template for the alignment.
```

`````{tab-set}
````{tab-item} Animated
```{figure} rotation_animated.png
---
align: left
name: rotation_animated
---
```
**Fig 1. Schematic illustration of Procrustes hyperalignment.**
With a high-dimensional rotation in the feature space (middle), the response patterns of different individuals (left) are aligned into a common space.
The representational geometry (right) is preserved in this process.
````

````{tab-item} First frame
```{figure} rotation_first.png
---
align: left
name: rotation_first
--- 
```
**Fig 1. Schematic illustration of Procrustes hyperalignment.**
With a high-dimensional rotation in the feature space (middle), the response patterns of different individuals (left) are aligned into a common space.
The representational geometry (right) is preserved in this process.
````

````{tab-item} Last frame
```{figure} rotation_last.png
---
align: left
name: rotation_last
---
```
**Fig 1. Schematic illustration of Procrustes hyperalignment.**
With a high-dimensional rotation in the feature space (middle), the response patterns of different individuals (left) are aligned into a common space.
The representational geometry (right) is preserved in this process.
````
`````

## Ridge hyperalignment

Ridge hyperalignment {cite:p}`feilong2023` (sometimes referred to as warp hyperalignment) uses **ridge regression** to learn the functional correspondence across individuals.
In addition to rotations or reflections, ridge hyperalignment allows **scaling and shearing** in the feature space, enabling more flexible alignment.
This approach captures both topographic and representational differences across individuals.

`````{tab-set}
````{tab-item} Animated
```{figure} ridge_animated.png
---
align: left
name: ridge_animated
---
```
**Fig 2. Schematic illustration of ridge hyperalignment.**
The transformation derived using ridge regression is not limited to orthogonal transformations (rotations and reflections) but can also include scaling and shearing in the feature space.
These additional degrees of freedom allow ridge hyperalignment to account for **both topographic and representational differences** across individuals.
````

````{tab-item} First frame
```{figure} ridge_first.png
---
align: left
name: ridge_first
---
```
**Fig 2. Schematic illustration of ridge hyperalignment.**
The transformation derived using ridge regression is not limited to orthogonal transformations (rotations and reflections) but can also include scaling and shearing in the feature space.
These additional degrees of freedom allow ridge hyperalignment to account for **both topographic and representational differences** across individuals.
````    

````{tab-item} Last frame
```{figure} ridge_last.png
---
align: left
name: ridge_last
---
```
**Fig 2. Schematic illustration of ridge hyperalignment.**
The transformation derived using ridge regression is not limited to orthogonal transformations (rotations and reflections) but can also include scaling and shearing in the feature space.
These additional degrees of freedom allow ridge hyperalignment to account for **both topographic and representational differences** across individuals.
````
`````

## Individualized Neural Tuning (INT) model

````{card}

```{figure} INT_schematic.png
---
align: left
name: INT_schematic
---
```

**Fig 3. Schematic illustration of the Individualized Neural Tuning (INT) model.**
In the INT model, the brain responses of each individual are modeled as an **individualized transformation** of a **shared template**.
See {cite:t}`feilong2023` for details.
````

## References

```{bibliography}
:filter: docname in docnames
:style: unsrt
```