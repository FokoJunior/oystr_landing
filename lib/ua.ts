export function parseUserAgent(ua: string) {
    const safe = ua || '';

    let os = 'Unknown';
    if (/Windows/i.test(safe)) os = 'Windows';
    else if (/Mac OS X|Macintosh/i.test(safe)) os = 'macOS';
    else if (/Android/i.test(safe)) os = 'Android';
    else if (/iPhone|iPad|iPod|iOS/i.test(safe)) os = 'iOS';
    else if (/Linux/i.test(safe)) os = 'Linux';

    let browser = 'Unknown';
    if (/Edg\//i.test(safe)) browser = 'Edge';
    else if (/OPR\/|Opera/i.test(safe)) browser = 'Opera';
    else if (/Chrome\//i.test(safe)) browser = 'Chrome';
    else if (/Firefox\//i.test(safe)) browser = 'Firefox';
    else if (/Safari\//i.test(safe)) browser = 'Safari';

    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/iPad|Tablet|Nexus 7|Nexus 10|KFAPWI/i.test(safe)) deviceType = 'tablet';
    else if (/Mobi|iPhone|iPod|Android/i.test(safe)) deviceType = 'mobile';

    let device = os;
    const androidMatch = safe.match(/Android[^;]*;\s*([^;)]+)/i);
    if (androidMatch) {
        device = androidMatch[1].trim();
    } else if (/iPad/i.test(safe)) {
        device = 'iPad';
    } else if (/iPhone/i.test(safe)) {
        device = 'iPhone';
    }

    return { os, browser, deviceType, device };
}
