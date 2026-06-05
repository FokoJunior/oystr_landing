import { supabaseAdmin } from './supabase';

export async function getSubscribers(): Promise<string[]> {
    const { data, error } = await supabaseAdmin
        .from('subscribers')
        .select('email')
        .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);
    return data.map((row) => row.email as string);
}

export async function addSubscriber(
    email: string
): Promise<{ added: boolean; already: boolean }> {
    const norm = email.trim().toLowerCase();

    const { error } = await supabaseAdmin
        .from('subscribers')
        .insert({ email: norm });

    if (error) {
        if (error.code === '23505') return { added: false, already: true };
        throw new Error(error.message);
    }

    return { added: true, already: false };
}

export async function getSubscriberCount(): Promise<number> {
    const { count, error } = await supabaseAdmin
        .from('subscribers')
        .select('*', { count: 'exact', head: true });

    if (error) throw new Error(error.message);
    return count ?? 0;
}
