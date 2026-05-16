# Content Rules — `convert`

> **Purpose:** Define authoring rules for all PDP pages and product content.  
> Any page added after these rules must comply before going live.

---

## 1. Specifications Table — Field Reference

Every PDP (`/product-name/index.html`) must include a `<table class="pdp-specs-table">`. The table below lists **every possible field**, whether it is required or optional, and the exact placeholder to use when real data is not available.

### 1.1. Master field table

| Field | Required? | Example real value | Placeholder when no data |
|---|---|---|---|
| **Origin** | ✅ Required | `Sivas, Türkiye` | `On Request` |
| **Material Type** | ✅ Required | `Natural Marble` | `On Request` |
| **Finish** | ✅ Required | `Polished, Honed` | `On Request` |
| **Color** | Optional | `Dark Tones` | `On Request` |
| **Pattern** | Optional | `Natural Veining` | `On Request` |
| **Density** | Optional | `Approx. 2.75` | `On Request` |
| **Application** | ✅ Required | `Flooring, Wall Cladding, Countertops` | `On Request` |
| **Variation** | ✅ Required | `Low`, `Moderate`, `High` | `On Request` |
| **Recommended Use** | ✅ Required | `Residential & Commercial` | `On Request` |
| **Thickness** | ✅ Required | `2 cm, 3 cm` | `On Request` |
| **Slab Size** | ✅ Required | `Up to 120" × 70"` | `On Request` |
| **Maintenance** | ✅ Required | `Low`, `Moderate`, `Low to Moderate` | `On Request` |
| **Stock Availability** | ✅ Required | `In Stock`, `In Stock — Limited`, `Lead Time: 4–6 wks` | `Enquire` |

### 1.2. Placeholder rules

**`On Request`** — use for any technical specification (dimensions, material properties, maintenance rating) that has not yet been confirmed by the product team. Signals to buyers that the spec is available but must be confirmed per order.

```html
<td>On Request</td>
```

**`Enquire`** — use **only** for `Stock Availability`. Stock is real-time and must never show a static guess. This word is a direct CTA pushing the buyer to contact sales.

```html
<td>Enquire</td>
```

**Never use:** `Coming Soon`, `TBD`, `N/A`, `-`, any fake number (e.g. `2 cm, 3 cm` when not confirmed), or `<em>(dummy)</em>`.

---

## 2. Download Spec Sheet Button Rules

```html
<a href="#" class="pdp-btn pdp-btn-outline">
  Download Spec Sheet
  <em style="font-size:10px;display:block;font-weight:400;letter-spacing:0;text-transform:none">
    (coming soon)
  </em>
</a>
```

- Keep `href="#"` and the `(coming soon)` label **until the actual PDF spec sheet is ready**.
- When the PDF is ready: replace `href="#"` with the direct download URL and **remove the `<em>(coming soon)</em>` line entirely**.
- Do not link to a Google Drive preview page — use a direct download link.

---

## 3. No Dummy / Placeholder Content Policy

**Forbidden in any published page:**

| ❌ Forbidden | ✅ Correct alternative |
|---|---|
| `(dummy)` anywhere in the file | Remove entirely |
| `<em>(dummy)</em>` or `<em>(coming soon)</em>` appended to a value | Use the clean placeholder: `On Request` or `Enquire` |
| `Coming Soon` in any spec field | `On Request` (specs) or `Enquire` (stock) |
| Fake dimension like `Varies, Average 120" — 70"` when not confirmed | `<td>On Request</td>` |
| `Low to Moderate` for Maintenance when not assessed | `<td>On Request</td>` |
| `In Stock`, `In Stock — Limited` when stock is not verified | `<td>Enquire</td>` |
| Lorem ipsum text | Real product description |

---

## 4. Adding a New PDP Page

Checklist before committing a new `product-name/index.html`:

- [ ] All **Required** fields in Section 1.1 are present in the spec table
- [ ] Fields without real data use exactly `<td>On Request</td>` or `<td>Enquire</td>` per the table in Section 1.1
- [ ] No `(dummy)`, `Coming Soon`, `TBD`, or fake numbers in any spec cell
- [ ] No `(dummy)` string exists anywhere in the file
- [ ] Spec Sheet button follows Section 2 rules
- [ ] `<title>`, `<meta name="description">`, and `<link rel="canonical">` are filled with product-specific content (not copied verbatim from another page)
- [ ] `<meta property="og:image">` points to a real product image
- [ ] All `href` links are correct relative paths (e.g. `../contact/index.html`, not `#` unless intentionally pending)

---

## 5. Updating a Placeholder Value

When confirmed data becomes available:

1. Open the product's `index.html`
2. Find `<td>On Request</td>` or `<td>Enquire</td>` for the relevant field
3. Replace with the confirmed value, e.g.:
   ```html
   <td>2 cm, 3 cm</td>
   ```
   ```html
   <td>In Stock — Limited</td>
   ```
4. For `Stock Availability`, also update any related category listing page if it shows stock status.
5. For the Spec Sheet button, replace the entire `<a>` block with:
   ```html
   <a href="URL_TO_PDF" class="pdp-btn pdp-btn-outline" download>Download Spec Sheet</a>
   ```

---

## 6. Verification Commands

Run these after editing any PDP to check for violations.

**Check for forbidden dummy markers:**
```powershell
Get-ChildItem "g:\elitestonesuppliers\convert" -Recurse -Filter "*.html" |
  Select-String -Pattern "\(dummy\)|<em>\(coming soon\)</em>|Coming Soon" |
  Select-Object Path, LineNumber, Line
```

**Check for unresolved placeholders (inventory of what still needs real data):**
```powershell
Get-ChildItem "g:\elitestonesuppliers\convert" -Recurse -Filter "*.html" |
  Select-String -Pattern "<td>On Request</td>|<td>Enquire</td>" |
  Select-Object Path, LineNumber, Line
```

A site ready for launch should return **no output** from the first command. The second command shows remaining fields to fill in before full completion.
