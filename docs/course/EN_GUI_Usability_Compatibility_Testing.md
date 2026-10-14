# GUI, Usability & Compatibility Testing (AI-First Edition)

> **Software Testing · UI Quality Master Reference**  
> Combined Reference Deck & Guide — FIT @ HCMUS (2024–2026)

---

## Overview & Structure

This master document covers three essential pillars of interface testing:
1. **Part 1: GUI Testing** — How the interface looks, element integrity, per-control checklists, and AI-driven visual testing.
2. **Part 2: Usability Testing** — Whether users can accomplish tasks, 6 core components, metrics, test plans, and modern tools.
3. **Part 3: Compatibility Testing** — Cross-browser, cross-device matrix, rendering engines, 4-rung tool spectrum, and cloud real-device testing.

---

## Part 1: GUI Testing

### 1.1 What is GUI Testing?
* **Definition**: Verifying that the Graphical User Interface (GUI) behaves and looks as specified across all visible components.
* **Core Philosophy**: *"Think as a user, not as a tester."* If the interface confuses or blocks users, they will not return.
* **Decomposition of Testable Elements**:
  * **Visuals**: Colors, fonts, alignments, orthography/spelling, icons, symbols, pictures, videos, tables.
  * **Controls**: Input fields, buttons, dropdowns, checkboxes, radio buttons, links, grids, date pickers, validation messages.

### 1.2 Common GUI Defects & Why GUI Testing is Hard
* **Common Defects**:
  * **Z-Index Overlays**: Buttons hidden behind transparent layers blocking clicks.
  * **Unhandled States**: Displaying `NaN ₫` or broken placeholders in pricing/numerical fields.
  * **Double-Submit**: Double-clicking a button submits requests twice.
* **Inherent Challenges**:
  * **Event-Driven Nature**: Users can click any pixel in any order (infinite input domain).
  * **Unsolicited Events**: OS-level interruptions (battery low, network loss, push notifications).
  * **Hidden Dependencies**: Complex business logic and state dependencies tied to single UI actions.

### 1.3 Per-Control Checklist & Verifications
* **Text Boxes**: Character limits, boundary values, placeholder clarity, input masking (passwords), trim spaces.
* **Buttons**: Primary vs. secondary visual distinction, hover/focus/disabled states, loading indicators.
* **Links & Error Pages**:
  * Primary/secondary button clarity.
  * Human-readable error pages (e.g., custom 503/404 pages with navigation back, rather than raw server dumps).

### 1.4 Automation Strategy & AI in GUI Testing
* **Automation Guidelines (Pareto Principle)**:
  * ~80% of benefit comes from ~20% of tests (navigation, high-volume BVA/EP, regression runs).
  * **Keep Manual**: Complex interactive syncs, exploratory testing, highly volatile UI elements.
  * **Coded > Recorded**: Hand-coded Page Object Models (POM) survive UI changes far better than record-and-playback scripts.
* **State of the Art AI in GUI Testing (2024–2026)**:
  * **Visual AI (Applitools / Percy)**: ML-driven layout comparisons ignoring acceptable rendering noise while detecting real structural drift.
  * **Self-Healing Locators**: Re-resolving broken DOM selectors automatically (75–90%+ success with intent-based LLMs).
  * **Browser Agents**: Playwright MCP + LLM driving browsers via the accessibility tree (roles/names).

### 1.5 GUI Testing Tools Stack
| Category | Free / Open-Source Tools | Commercial / Cloud Tools |
| :--- | :--- | :--- |
| **E2E GUI Automation** | Playwright, Selenium, Cypress | testRigor, Mabl |
| **Visual Regression AI** | BackstopJS, Lost Pixel | Applitools Eyes, Percy, SmartUI |
| **Accessibility (a11y)** | axe DevTools, WAVE, Lighthouse | Deque Enterprise |
| **Agentic GUI Testing** | Playwright MCP + LLM | KaneAI (TestMu AI) |

---

## Part 2: Usability Testing

### 2.1 What is Usability Testing?
* **Definition**: A structured process employing representative users to evaluate a product against defined usability criteria.
* **Rubin's 6 Required Components**:
  1. **Specific Objectives**: Written problem statements and a test plan.
  2. **Representative Users**: Real sample of target population.
  3. **Real Environment**: Actual operating conditions, not idealized settings.
  4. **Observation**: Watching users perform tasks and listening to think-aloud feedback.
  5. **Quantitative + Qualitative Data**: Combining metrics (time, success rate) with subjective impressions.
  6. **Analysis & Recommendations**: Prioritized bug fixes and UX improvements.

### 2.2 Usability Testing Methodology & Dimensions
* **Testing Modes**:
  * **Moderated vs. Unmoderated**: Facilitator-guided (richer qualitative context) vs. self-paced remote (scalable, quantitative).
  * **Qualitative vs. Quantitative**: Think-aloud interviews vs. System Usability Scale (SUS) & task benchmarks.
  * **Locations**: In-lab, remote synchronous, remote asynchronous, hallway/guerrilla testing.

### 2.3 The 9-Part Usability Test Plan
1. Purpose & Scope
2. User Profile & Evaluator Selection
3. Test Design & Method
4. Task Scenarios (Realistic, actionable)
5. Test Environment & Equipment
6. Evaluator Roles (Facilitator, Logger)
7. Quantitative Metrics & Performance Benchmarks
8. Preference Metrics & Post-Test Surveys (SUS, SEQ)
9. Report Format & Stakeholder Deliverables

### 2.4 Usability Testing Tools Evolution
| Objective | Classic Course Tools | Modern Equivalent (2024–2026) |
| :--- | :--- | :--- |
| **Remote Unmoderated** | Loop11, FiveSecondTest | Maze, Lyssna, Useberry |
| **Session Recording** | UserTesting, Userfly | UserTesting, Lookback |
| **Heatmaps & Replay** | ClickTale | Microsoft Clarity (Free), Hotjar, FullStory |
| **AI Usability Analysis** | — | Attention Insight, Maze AI, Synthetic Users |

---

## Part 3: Browser & Device Compatibility Testing

### 3.1 Why Compatibility Testing Matters
* **Core Problem**: The same code renders differently depending on rendering engine, OS, device, screen resolution, and network speed.
* **Three Major Rendering Engines**:
  1. **Blink**: Chrome, Edge, Opera, Brave.
  2. **WebKit**: Safari (macOS) and **ALL iOS browsers** (iOS Chrome/Firefox are forced to use WebKit).
  3. **Gecko**: Firefox.
* **Compatibility Matrix**: Build matrix from analytics data; test top 10–15 target combinations every release cycle.

### 3.2 The 4-Rung Compatibility Tool Spectrum

```
[Rung 1: Offline Visual Regression] 
       ↓ (Playwright toHaveScreenshot, BackstopJS)
[Rung 2: Local Emulation] 
       ↓ (Chrome DevTools, Responsively App)
[Rung 3: Online Screenshot Generation] 
       ↓ (BrowserStack Screenshots, Percy, SmartUI)
[Rung 4: Cloud Real-Device Simulation]
         (BrowserStack Live/Automate, AWS Device Farm, LambdaTest)
```

1. **Rung 1: Offline Visual Regression**: Free local execution (Playwright, BackstopJS) catching CSS layout shifts and pixel diffs.
2. **Rung 2: Local Emulation**: Interactive responsive checks on desktop browsers via DevTools or Responsively.
3. **Rung 3: Online Screenshot Generation**: Single URL input generating screenshots across multiple OS/browser matrixes.
4. **Rung 4: Cloud Real-Device Farms**: Real device execution (BrowserStack, AWS Device Farm, SauceLabs) on physical hardware for native accuracy.

---

## Hands-On Exercises & Deliverables

### Exercise 1: GUI & Accessibility Audit
* Select an application form (e.g., OrangeHRM / MentorUS login).
* Perform a per-control checklist review (inputs, buttons, dropdowns, validations).
* Conduct a 10 Nielsen Heuristics walkthrough and run automated accessibility scans (`axe-core` / Lighthouse).
* **Deliverable**: Filled GUI review sheet + 1-page comparative summary of manual vs. automated findings.

### Exercise 2: Usability Study
* Create a mini test plan with 3 key user tasks, success criteria, and benchmark completion times.
* Run a think-aloud usability test with 3 users.
* Collect performance metrics (time on task, error rate, completion %) and preference metrics (SEQ/SUS).
* **Deliverable**: 1-page usability report with prioritized severity recommendations and visual evidence.
