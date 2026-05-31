# Spotify Playlist Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new, toggleable Spotify playlist section to the bottom of the portfolio (after hackathons).

**Architecture:** Use Astro's content layer for configuration and a dedicated component for the section layout, integrating it into the main index page.

**Tech Stack:** Astro, Tailwind CSS, daisyUI.

---

### Task 1: Update Content Schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add new fields to general schema**

Modify `src/content.config.ts`:
```typescript
<<<<
    showCertificationsSection: z.boolean(),
    showHackathonsSection: z.boolean(),
    showContactSection: z.boolean(),
  }),
});
====
    showCertificationsSection: z.boolean(),
    showHackathonsSection: z.boolean(),
    showSpotifySection: z.boolean(),
    spotifyPlaylistUrl: z.string().url(),
    showContactSection: z.boolean(),
  }),
});
>>>>
```

- [ ] **Step 2: Verify schema change**

Run: `npx astro check` (or just check for lint errors if types are being generated)
Expected: Success or common type generation message.

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add spotify fields to general content schema"
```

---

### Task 2: Update Configuration Data

**Files:**
- Modify: `src/content/general/index.yaml`

- [ ] **Step 1: Add initial values for Spotify section**

Modify `src/content/general/index.yaml`:
```yaml
<<<<
showCertificationsSection: true
showHackathonsSection: true
showContactSection: false
====
showCertificationsSection: true
showHackathonsSection: true
showSpotifySection: true
spotifyPlaylistUrl: "https://open.spotify.com/playlist/2JT2QwFoDrInYeZZ4T2DiH?si=hm7Px3_wRrqAZfhQc7r7hQ"
showContactSection: false
>>>>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/general/index.yaml
git commit -m "config: enable spotify section and add playlist url"
```

---

### Task 3: Create SpotifySection Component

**Files:**
- Create: `src/components/SpotifySection.astro`

- [ ] **Step 1: Implement the component layout**

Create `src/components/SpotifySection.astro`:
```astro
---
import Spotify from "./Spotify.astro";

interface Props {
  url: string;
}

const { url } = Astro.props;
---

<section id="spotify" class="py-20 px-4">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">My Favorite Playlist</h2>
    </div>
    
    <Spotify url={url} />
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SpotifySection.astro
git commit -m "feat: create SpotifySection component"
```

---

### Task 4: Integrate Section into Index Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Import the new component**

Modify `src/pages/index.astro` (imports):
```typescript
<<<<
import Hackathons from "../components/Hackathons.astro";
import Contact from "../components/Contact.astro";
====
import Hackathons from "../components/Hackathons.astro";
import SpotifySection from "../components/SpotifySection.astro";
import Contact from "../components/Contact.astro";
>>>>
```

- [ ] **Step 2: Add the section to the layout**

Modify `src/pages/index.astro` (render block):
```astro
<<<<
      <!-- Hackathons Section -->
      {general.showHackathonsSection && <Hackathons />}

      <!-- Contact Section -->
====
      <!-- Hackathons Section -->
      {general.showHackathonsSection && <Hackathons />}

      <!-- Spotify Section -->
      {general.showSpotifySection && <SpotifySection url={general.spotifyPlaylistUrl} />}

      <!-- Contact Section -->
>>>>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Success.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: integrate spotify section into index page"
```

---

### Task 5: Final Verification

- [ ] **Step 1: Toggle verification**

1. Set `showSpotifySection: false` in `src/content/general/index.yaml`.
2. Check if the section disappears from the build/preview.
3. Set it back to `true`.

- [ ] **Step 2: URL verification**

1. Change `spotifyPlaylistUrl` to another valid Spotify URL.
2. Confirm the widget updates.

- [ ] **Step 3: Commit final config changes**

```bash
git add src/content/general/index.yaml
git commit -m "config: finalize spotify section configuration"
```
