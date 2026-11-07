# Grantly Financial Models & Mathematical Proofs

## 1. Out-of-Pocket Net Tuition Gap
Pending applications are strictly quarantined:
$$\text{Guaranteed Aid} = \text{Other Aid} + \sum_{i \in \text{Awarded}} \text{Amount}_i$$
$$\text{Net Gap} = \max\left(0, \text{Cost} - \text{Guaranteed Aid}\right)$$

## 2. "What If All Pending Win?" Simulator
$$\text{Simulated Aid} = \text{Guaranteed Aid} + \sum_{j \in \text{Pending}} \text{Amount}_j$$
$$\text{Simulated Gap} = \max\left(0, \text{Cost} - \text{Simulated Aid}\right)$$
$$\text{Surplus} = \max\left(0, \text{Simulated Aid} - \text{Cost}\right)$$

## 3. 4-Year Debt Horizon Spline
Accounts for annual tuition inflation ($r = 3.5\%$):
$$\text{Cost}_y = \text{Cost}_1 \times (1 + r)^{y-1} \quad \text{for } y \in \{1, 2, 3, 4\}$$
$$\text{Deficit}_y = \max\left(0, \text{Cost}_y - \text{Guaranteed Aid}\right)$$
$$\text{Cumulative Debt} = \sum_{y=1}^{4} \text{Deficit}_y$$
