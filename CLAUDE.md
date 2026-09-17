# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
A romantic interactive digital experience for Chantal & Wilander. It is a multi-scene static web application built with Vanilla JS, HTML, and CSS.

## Architecture
- **Scene Management**: The app uses a state-driven system in `js/app.js` to transition between different `section.scene` elements.
- **Content Separation**: To allow easy updates without touching logic, content is decoupled:
  - `content/memories.js`: Configures the photo galleries (`GALLERY_PHOTOS`, `CHARCAS_PHOTOS`).
  - `content/letter.js`: Contains the text for the personal letter.
  - `js/content.js`: Holds static text for scene titles, buttons, and prompts.
- **Visuals & Animations**: 
  - `css/style.css`: Handles the "warm night" design system and transitions.
  - `js/animations.js`: Implements stagger reveals and background effects (like fireflies).
- **State**: A simple `state` object in `js/app.js` tracks user-inputted names and dates.

## Development Workflow
- **Running the project**: Open `index.html` in any modern web browser.
- **Adding content**: 
  - For photos: Add files to `assets/photos/` and update `content/memories.js`.
  - For text: Modify `js/content.js` or `content/letter.js`.
- **Adding a scene**: 
  1. Add a `<section class="scene" data-scene="key">` to `index.html`.
  2. Add the scene key to the `SCENES` array in `js/app.js`.
  3. Implement an `ENTER_HOOK` if the scene requires specific initialization logic.
