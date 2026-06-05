/**
 * Simple file-based subscriber store.
 * Saves emails to data/subscribers.json at the project root.
 * In production, replace with a database like Supabase/Prisma.
 */
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'subscribers.json');

function ensureFile() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify([]), 'utf-8');
}

export function getSubscribers(): string[] {
    ensureFile();
    try {
        return JSON.parse(fs.readFileSync(FILE, 'utf-8')) as string[];
    } catch {
        return [];
    }
}

export function addSubscriber(email: string): { added: boolean; already: boolean } {
    ensureFile();
    const list = getSubscribers();
    const norm = email.trim().toLowerCase();
    if (list.includes(norm)) return { added: false, already: true };
    list.push(norm);
    fs.writeFileSync(FILE, JSON.stringify(list, null, 2), 'utf-8');
    return { added: true, already: false };
}
