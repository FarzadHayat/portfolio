# Design Spec: Spotify Playlist Section

Add a new, toggleable Spotify playlist section to the portfolio website, positioned after the Hackathons section.

## Goals
- Add a dedicated section for a Spotify playlist widget.
- Allow the section to be toggled on/off via configuration.
- Allow the playlist URL to be easily changed via configuration.
- Maintain visual consistency with existing portfolio sections.

## Architecture & Data Flow

### 1. Configuration (Schema & Data)
- **File:** `src/content.config.ts`
  - Update the `general` collection schema to include:
    - `showSpotifySection`: `z.boolean()`
    - `spotifyPlaylistUrl`: `z.string().url()`
- **File:** `src/content/general/index.yaml`
  - Add the corresponding fields:
    ```yaml
    showSpotifySection: true
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/2JT2QwFoDrInYeZZ4T2DiH?si=hm7Px3_wRrqAZfhQc7r7hQ"
    ```

### 2. Components
- **Existing Component:** `src/components/Spotify.astro`
  - A simple wrapper for the Spotify `<iframe>` embed.
- **New Component:** `src/components/SpotifySection.astro`
  - Responsibilities:
    - Render a `<section>` with standard padding and ID (`#spotify`).
    - Display a centered `<h2>` title ("My Favorite Playlist").
    - Render the `Spotify.astro` component with the configured URL.
  - Layout Pattern:
    ```html
    <section id="spotify" class="py-20 px-4 bg-base-100">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">My Favorite Playlist</h2>
        </div>
        <Spotify url={spotifyPlaylistUrl} />
      </div>
    </section>
    ```

### 3. Integration
- **File:** `src/pages/index.astro`
  - Import `SpotifySection` from `../components/SpotifySection.astro`.
  - Place `<SpotifySection />` after the `{general.showHackathonsSection && <Hackathons />}` block.
  - Wrap it in a conditional: `{general.showSpotifySection && <SpotifySection />}`.

## Success Criteria
- The Spotify section appears below Hackathons when `showSpotifySection` is `true`.
- The Spotify section is hidden when `showSpotifySection` is `false`.
- The playlist widget correctly loads the playlist specified in `spotifyPlaylistUrl`.
- The section's visual style (spacing, headings) matches the rest of the portfolio.

## Testing Strategy
1. **Visual Verification:** Manually check the layout on desktop and mobile viewports.
2. **Toggle Verification:** Set `showSpotifySection` to `false` and confirm the section disappears.
3. **URL Verification:** Change the `spotifyPlaylistUrl` and confirm the widget updates.
