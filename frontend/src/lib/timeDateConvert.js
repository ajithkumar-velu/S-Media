export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeString = date.toLocaleTimeString('en-US', options);

    if (date.toDateString() === now.toDateString()) {
        return `Today, ${timeString}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${timeString}`;
    } else if (date >= oneWeekAgo) {
        return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${timeString}`;
    } else {
        return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    }
}