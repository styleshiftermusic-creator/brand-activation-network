#!/usr/bin/env node
/**
 * generate-audio-openai.js
 * Reads all 7 module TED Talk scripts, strips stage directions,
 * and calls the OpenAI TTS API to produce MP3 files in public/audio/.
 *
 * Usage: node scripts/generate-audio-openai.js
 * Requires: OPENAI_API_KEY in .env.local
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── Config ───────────────────────────────────────────────────────────────────

// Load .env.local manually
const envPath = path.join(__dirname, "../.env.local");
let env = {};
if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of envLines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIndex = trimmed.indexOf("=");
        if (eqIndex === -1) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        env[key] = value;
    }
}

const API_KEY = env["OPENAI_API_KEY"];
const VOICE = "onyx"; // Very premium, deep authoritative voice
const MODEL = "tts-1-hd"; // High definition audio

if (!API_KEY) {
    console.error("❌ OPENAI_API_KEY not set in .env.local");
    console.error("   Please add OPENAI_API_KEY=sk-proj-... to your .env.local file.");
    process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, "../public/audio");
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ─── Script Sources ───────────────────────────────────────────────────────────

// Path to the brain folder containing the artifacts
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

function extractNarration(markdown) {
    const lines = markdown.split("\n");
    const spoken = [];
    let hasStarted = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === "**NARRATOR:**") {
            hasStarted = true;
            continue;
        }

        if (!hasStarted) continue;

        // Skip stage directions: lines starting with > or wrapped in *...*
        if (trimmed.startsWith(">")) continue;
        if (trimmed.startsWith("*") && trimmed.endsWith("*")) continue;
        if (trimmed.startsWith("**[SLIDE")) continue;
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

    return spoken.join(" ");
}

// ─── OpenAI Chunking & API Call ───────────────────────────────────────────────

// OpenAI has a 4096 character limit for TTS. We must split the text.
function chunkText(text, maxLength) {
    const sentences = text.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+/g) || [];
    const chunks = [];
    let currentChunk = "";

    for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > maxLength) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += " " + sentence;
        }
    }
    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }
    return chunks;
}

function generateAudioChunk(text) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            model: MODEL,
            input: text,
            voice: VOICE,
        });

        const options = {
            hostname: "api.openai.com",
            path: "/v1/audio/speech",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body),
            },
        };

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                let errBody = "";
                res.on("data", (d) => (errBody += d));
                res.on("end", () => reject(new Error(`OpenAI API error ${res.statusCode}: ${errBody}`)));
                return;
            }

            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
                resolve(Buffer.concat(chunks));
            });
        });

        req.on("error", reject);
        req.write(body);
        req.end();
    });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log(`\n🎙️  OpenAI Audio Generator`);
    console.log(`   Voice : ${VOICE}`);
    console.log(`   Model : ${MODEL}`);
    console.log(`   Output: public/audio/\n`);

    for (const mod of modules) {
        const scriptPath = path.join(SCRIPTS_DIR, mod.file);

        if (!fs.existsSync(scriptPath)) {
            console.warn(`⚠️  Module ${mod.id} script not found at ${scriptPath} — skipping.`);
            continue;
        }

        const markdown = fs.readFileSync(scriptPath, "utf8");
        const narration = extractNarration(markdown);
        const outputPath = path.join(OUTPUT_DIR, `module-${mod.id}.mp3`);

        console.log(`⏳ Processing Module ${mod.id}... (${narration.split(" ").length} words)`);
        
        // OpenAI character limit per request is 4096. We chunk to ~3800 to be safe
        const chunks = chunkText(narration, 3800);
        console.log(`   [Split into ${chunks.length} chunks to respect API limits]`);

        try {
            const audioBuffers = [];
            let i = 1;
            for (const chunk of chunks) {
                console.log(`     -> Generating chunk ${i}/${chunks.length}...`);
                const audioBuf = await generateAudioChunk(chunk);
                audioBuffers.push(audioBuf);
                i++;
            }
            
            // Concatenate all MP3 buffers and write to disk
            const finalBuffer = Buffer.concat(audioBuffers);
            fs.writeFileSync(outputPath, finalBuffer);
            
            const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
            console.log(`✅ Module ${mod.id} saved → module-${mod.id}.mp3 (${sizeMB} MB)\n`);
        } catch (err) {
            console.error(`❌ Module ${mod.id} failed: ${err.message}\n`);
        }
    }

    console.log("🎉 Done! Audio generation complete.");
}

main();
