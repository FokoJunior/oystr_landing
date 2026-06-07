import { supabaseAdmin } from '@/lib/supabase';

export type VisitInfo = {
    ip: string | null;
    user_agent: string | null;
    device_type: string | null;
    device: string | null;
    browser: string | null;
    os: string | null;
    referrer: string | null;
    path: string | null;
};

export async function logVisit(info: VisitInfo) {
    const { error } = await supabaseAdmin.from('landing_visits').insert(info);
    if (error) throw error;
}
