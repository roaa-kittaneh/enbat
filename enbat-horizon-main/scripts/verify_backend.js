import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load .env manually to avoid extra dependencies
function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        if (!fs.existsSync(envPath)) return {};
        const content = fs.readFileSync(envPath, 'utf-8');

        return content.split('\n').reduce((acc, line) => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                let value = match[2].trim();
                // Remove quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                acc[match[1].trim()] = value;
            }
            return acc;
        }, {});
    } catch (e) {
        console.error("Error loading .env:", e);
        return {};
    }
}

const env = loadEnv();
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Error: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are required in .env file.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("🔍 Starting Backend Verification Tests...\n");

async function verifyPublicReadAccess() {
    console.log("header: Testing Public Read Access (Services Table)...");
    const { data, error } = await supabase.from('services').select('*').limit(1);

    if (error) {
        console.error("❌ Failed: Public read access denied or error occurred.", error.message);
    } else {
        console.log("✅ Passed: Public can read services.");
    }
}

async function verifyUnauthorizedWrite() {
    console.log("\nheader: Testing Unauthorized Write Access (Anon attempting Create)...");

    const { error } = await supabase.from('services').insert({
        name: 'Hacker Service',
        description: 'Should not exist'
    });

    if (error) {
        // We expect a security error
        console.log("✅ Passed: Write action was blocked as expected. Error:", error.message);
    } else {
        console.error("❌ Failed: Anonymous user was able to write to the database!");
    }
}

async function verifySchemaExistence() {
    console.log("\nheader: Verifying Schema Existence...");

    // We check if tables allow querying, which effectively checks existence + RLS select policy
    const tables = ['services', 'teams', 'projects'];

    for (const table of tables) {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (error && error.code === '42P01') { // undefined_table code in Postgres often, but via API http 404/400
            console.error(`❌ Failed: Table '${table}' might not exist.`);
        } else if (error) {
            // If it's a permission error, the table exists but might be locked down (which is fine for RLS check but we want specific policies)
            console.log(`ℹ️  Table '${table}' exists (Response: ${error.message || 'OK'}).`);
        } else {
            console.log(`✅ Table '${table}' exists and is readable.`);
        }
    }
}

async function run() {
    await verifySchemaExistence();
    await verifyPublicReadAccess();
    await verifyUnauthorizedWrite();
    console.log("\nCopy and paste the below output to the chat if you see failures.");
}

run();
