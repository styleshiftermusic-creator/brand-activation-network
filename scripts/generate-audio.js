#!/usr/bin/env node
/**
 * generate-audio.js
 * Reads all 7 module TED Talk scripts, strips stage directions,
 * and calls the ElevenLabs TTS API to produce MP3 files in public/audio/.
 *
 * Usage: node scripts/generate-audio.js
 * Requires: ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in .env.local
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── Config ───────────────────────────────────────────────────────────────────

// Load .env.local manually (no dotenv dependency needed)
const envPath = path.join(__dirname, "../.env.local");
const envLines = fs.readFileSync(envPath, "utf8").split("\n");
const env = {};
for (const line of envLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
    }
    env[key] = value;
}


const API_KEY = env["ELEVENLABS_API_KEY"];
const VOICE_ID = env["ELEVENLABS_VOICE_ID"] || "pNInz6obpgDQGcFmaJgB"; // Default: Adam
const MODEL_ID = "eleven_turbo_v2_5"; // Fastest + highest quality

if (!API_KEY || API_KEY === "PASTE_YOUR_KEY_HERE") {
    console.error("❌ ELEVENLABS_API_KEY not set in .env.local");
    process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, "../public/audio");
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log("📁 Created public/audio/");
}

// ─── Script Sources ───────────────────────────────────────────────────────────

const SCRIPTS_DIR = "/Users/styleshifter/.gemini/antigravity/brain/58b3ee67-2a7c-4af0-af4a-250008019dee";

const modules = [
    { id: 1, file: "module-1-ted-talk-script.md" },
    { id: 2, file: "module-2-ted-talk-script.md" },
    { id: 3, file: "module-3-ted-talk-script.md" },
    { id: 4, file: "module-4-ted-talk-script.md" },
    { id: 5, file: "module-5-ted-talk-script.md" },
    { id: 6, file: "module-6-ted-talk-script.md" },
    { id: 7, file: "module-7-ted-talk-script.md" },
];

// ─── Text Extraction ──────────────────────────────────────────────────────────

function extractNarration(markdown) {
    const lines = markdown.split("\n");
    const spoken = [];

    for (const line of lines) {
        const trimmed = line.trim();

        // Skip stage directions: lines starting with > or wrapped in *...*
        if (trimmed.startsWith(">")) continue;
        if (trimmed.startsWith("*") && trimmed.endsWith("*")) continue;
        if (trimmed.startsWith("**[SLIDE")) continue;
        if (trimmed === "**NARRATOR:**") continue;
        if (trimmed.startsWith("#")) continue;
        if (trimmed.startsWith("---")) continue;
        if (trimmed === "*[END OF SCRIPT]*") continue;
        if (trimmed === "") continue;

        // Remove bold markdown but keep the text
        const clean = trimmed
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*(pause)\*/g, "")
            .replace(/\*(.*?)\*/g, "$1")
            .trim();

        if (clean.length > 2) spoken.push(clean);
    }

    return spoken.join("\n\n");
}

// ─── ElevenLabs API Call ──────────────────────────────────────────────────────

function generateAudio(text, outputPath) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            text,
            model_id: MODEL_ID,
            voice_settings: {
                stability: 0.55,
                similarity_boost: 0.80,
                style: 0.2,
                use_speaker_boost: true,
            },
        });

        const options = {
            hostname: "api.elevenlabs.io",
            path: `/v1/text-to-speech/${VOICE_ID}`,
            method: "POST",
            headers: {
                "xi-api-key": API_KEY,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body),
                Accept: "audio/mpeg",
            },
        };

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                let errBody = "";
                res.on("data", (d) => (errBody += d));
                res.on("end", () => reject(new Error(`ElevenLabs API error ${res.statusCode}: ${errBody}`)));
                return;
            }

            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
                const buffer = Buffer.concat(chunks);
                fs.writeFileSync(outputPath, buffer);
                resolve(outputPath);
            });
        });

        req.on("error", reject);
        req.write(body);
        req.end();
    });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log(`\n🎙️  ElevenLabs Audio Generator`);
    console.log(`   Voice ID : ${VOICE_ID}`);
    console.log(`   Model    : ${MODEL_ID}`);
    console.log(`   Output   : public/audio/\n`);

    for (const mod of modules) {
        const scriptPath = path.join(SCRIPTS_DIR, mod.file);

        if (!fs.existsSync(scriptPath)) {
            console.warn(`⚠️  Module ${mod.id} script not found at ${scriptPath} — skipping.`);
            continue;
        }

        const markdown = fs.readFileSync(scriptPath, "utf8");
        const narration = extractNarration(markdown);
        const outputPath = path.join(OUTPUT_DIR, `module-${mod.id}.mp3`);

        console.log(`⏳ Generating Module ${mod.id}... (${narration.split(" ").length} words)`);

        try {
            await generateAudio(narration, outputPath);
            const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
            console.log(`✅ Module ${mod.id} saved → module-${mod.id}.mp3 (${sizeMB} MB)`);
        } catch (err) {
            console.error(`❌ Module ${mod.id} failed: ${err.message}`);
        }

        // Brief pause between requests to be kind to the API
        if (mod.id < 7) {
            await new Promise((r) => setTimeout(r, 1500));
        }
    }

    console.log("\n🎉 Done! Update audioSrc in course-content.ts to /audio/module-X.mp3");
}

main();
