# Master Agency Orchestration Prompt

**Mission Objective:** Execute a comprehensive build-out for Brand Activation Network. Act as the Senior Agency Architect.

## Phase 1: Deep Context Scan & Planning

* First, use the `agency-architect` and `ui-pro-max` global skills to scan the current workspace.
* Analyze the existing dependencies and architectural patterns. Use the Browser Agent to research current industry standards for the client.
* Produce a detailed Implementation Plan Artifact. This plan must include the proposed file structure, database schema (via `@mcp:supabase` or `@mcp:google_cloud`), and a list of specialized sub-agents to be deployed.

## Phase 2: Multi-Agent Deployment

* Spawn and orchestrate the following specialists:
  * **@frontend:** Build a responsive, high-conversion UI using the UI Pro Max reasoning rules. Ensure Material Minimal design principles.
  * **@backend:** Develop secure API endpoints and authentication flows. Ground all SQL logic in our connected MCP database schema.
  * **@seo:** Implement a metadata strategy and semantic HTML structure optimized for search rankings.
  * **@debugger:** Monitor all terminal outputs. Automatically fix any deployment or execution errors using the Turbo permission level.

## Phase 3: Automated Verification & Proof

* Once the build is complete, use the Browser Agent to execute a full suite of end-to-end tests.
* Capture a Browser Recording Artifact showing the successful user journey (e.g., login, form submission, data retrieval).
* Generate a Walkthrough Artifact that serves as professional release notes for the client, detailing exactly what was built and how it was verified.

## Phase 4: Knowledge Capture

* Identify any reusable code patterns or complex logic solved during this build. Save these as Knowledge Items (KIs) in our agency-wide knowledge base to accelerate future builds.

*Do not stop until the Task List is 100% complete and all Artifacts are ready for human review.*
