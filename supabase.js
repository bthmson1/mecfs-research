const SUPABASE_URL =
    "https://wippsufjhilgmtpvaftj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_r0P9JU6p1SoxJZVxrLPPVA_DhRcfWuf";


window.supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
    