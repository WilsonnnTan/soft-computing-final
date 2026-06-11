# Instagram Post Design Labeling Guide (`pos`, `neutral`, `neg`)

This document defines the labeling criteria used to judge whether an Instagram post design should be categorized as appealing (`Positive` / `pos`), average (`Neutral` / `neutral`), or unappealing (`Negative` / `neg`).

---

## 1. Main Evaluation Parameters

Each post design is evaluated based on the presence and quality of these two core elements:

1. **Text element (brand text or slogan):** The design should include short, clear, concise writing with the impact of a promotional slogan.
2. **Image element (product or theme visual):** The design should include a clear, sharp, and relevant product photo or main illustration.

---

## 2. Appealing Design Criteria (`Positive` / `pos`)

A post is categorized as **Positive (`pos`)** when it meets criteria such as the following:

| Criteria | Detailed Explanation | Real Dataset Examples (1-100) |
| :--- | :--- | :--- |
| **Short and clear slogan** | Contains short promotional text, usually no more than 5-7 words, highlighting the brand, a main promotion, or a memorable slogan. | `001_pos.png` ("Paket Spesial Rp 55.000" from Es Teler 77)<br>`009_pos.png` ("HUT KOTAKU Rp 46.364" from KFC)<br>`036_pos.png` ("BMT DEALS Special Price Rp 35rb" from Subway) |
| **Clear product image** | Shows a real product photo or main illustration with high resolution, good lighting, sharp focus, and no blur. | `002_pos.png` (Chocolate boba drink)<br>`013_pos.png` (Chicken mushroom rice dish)<br>`035_pos.png` (Cup of boba with a clean background) |
| **Balanced composition** | The slogan and product image work together well, the layout looks clean, and text does not cover important parts of the product. | `011_pos.png` (POCO C81 Pro ad)<br>`009_pos.png` (KFC promotion with iconic red background)<br>`036_pos.png` (Subway BMT Deals with a neat layout) |

---

## 3. Average Design Criteria (`Neutral` / `neutral`)

A post is categorized as **Neutral (`neutral`)** when the design is functional and acceptable, but it does not stand out aesthetically like a positive example and does not contain fatal flaws like a negative one.

| Criteria | Detailed Explanation | Real Dataset Examples (1-100) |
| :--- | :--- | :--- |
| **Simple slogan or basic informational text** | The text is closer to a plain description, brand label, or operating information than a punchy promotional slogan. Word count is moderate, usually around 8-15 words, but still organized. | `007_pos.png` (Lawson 10-item menu list, dense but tidy)<br>`044_pos.png` (Batagor Bandoeng with standard labeling) |
| **Standard visual or plain product photo** | The product photo is clear and focused, but uses a plain background, lacks artistic styling, or has no meaningful slogan or overlay text. | `010_neg.png` (Samsung ViewFinity monitor)<br>`074_neg.png` (Swarovski ring photo)<br>`075_neg.png` (Coach bag)<br>`061_neg.png` (BMW 7 display car) |
| **Functional layout or standard template** | The design uses a common instant template such as Canva with placeholder contact data, or uses fictional or unfamiliar script that does not function well for a general audience. | `018_pos.png` (Es Cendol template)<br>`020_pos.png` (Fauget Croissant template)<br>`032_pos.png` (Generic design template)<br>`033_pos.png` (Takoyaki template)<br>`051_pos.png` (Burger King Aurebesh) |

---

## 4. Unappealing Design Criteria (`Negative` / `neg`)

A post is categorized as **Negative (`neg`)** when it has one or more of the following weaknesses:

| Criteria | Detailed Explanation | Real Dataset Examples (1-100) |
| :--- | :--- | :--- |
| **No slogan or supporting text** | The post image has no overlay text at all, and the product photo looks unarranged or amateurish, such as food in plastic packaging or a messy background. | `057_neg.png` (Asparagus and bread dish)<br>`063_neg.png` (Rear view of a Ferrari) |
| **Too much information** | The text is too long, too dense, too small, or contains too many promotions and contact details, covering more than 30% of the image area and making the design feel cluttered. | `012_neg.png` (Housing brochure full of text detail)<br>`017_neg.png` (Pohon Cabe sauce brochure with dense text and logos) |

---

## 5. Labeling Logic Summary Matrix

| Is there a short slogan? | Is there a clear product image? | Is the design neat and balanced? | Final Label | Filename Suffix |
| :---: | :---: | :---: | :---: | :---: |
| **Yes** (short and clear) | **Yes** (sharp and relevant) | **Yes** (harmonious) | **Positive** | `_pos` |
| **Moderate** (simple label or text) | **Yes** (standard) | **Yes** (simple or functional) | **Neutral** | `_neutral` |
| **No** | **Yes or No** | **Yes or No** | **Negative** | `_neg` |

---

## 6. Algorithmic Bias Mitigation And Evaluation Fairness

To keep the dataset fair and avoid bias that could reduce CNN generalization quality, apply the following principles while labeling data:

### A. Risks Of Algorithmic Bias In The CNN Model

1. **Subjective labeling noise:** If criteria such as "balanced design" are judged only by one person's personal taste, the dataset labels become inconsistent. That makes it harder for the CNN to learn stable visual patterns and can lower accuracy, reduce precision, or cause overfitting to one annotator's preferences.
2. **Product discrimination bias or shortcut learning:** If expensive global-brand products are labeled `_pos` simply because they use polished studio photography, while small local products are labeled `_neg` because their photos look simpler, the CNN may learn shortcuts. The model can end up associating luxury studio backgrounds or famous brand cues with `_pos`, while treating simpler local-product visuals as `_neg`.

### B. Fairness Guidelines

- **Prioritize structure and readability, not luxury:** A simple local-business design can still deserve `_pos` if the product photo is focused, the slogan is clear, and the color contrast is good. Do not penalize a post only because it lacks expensive production effects.
- **Use consensus labeling:** Avoid assigning the entire labeling task to one group member. Use cross-labeling so at least two members assess the same image independently. When labels differ, resolve them through discussion using the criteria in this document.
- **Standardize category measurements:** Define a short slogan objectively as text with 7 words or fewer. Define "too much information" objectively as text covering more than 30% of the image or containing dense paragraph-style copy.
- **Maintain class balance:** Keep the number of `_pos` and `_neg` labels reasonably balanced in the training dataset so the model does not lean too heavily toward one class.
