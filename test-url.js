
const getYouTubeEmbedUrl = (url) => {
    try {
        if (!url) return null;
        console.log("Parsing:", url);
        if (url.includes('youtu.be/')) {
            const id = url.split('youtu.be/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }
        if (url.includes('youtube.com/watch?v=')) {
            const id = url.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }
        return null;
    } catch (e) {
        console.error("Error:", e);
        return null;
    }
};

const urls = [
    'https://youtu.be/aircAruvnKk?si=123',
    'https://youtu.be/-w6oW1ut4Dw?si=9j8EKW9c2KpOJ_lI',
    'https://youtu.be/4e0M9f0Yh8Y?si=Y_8jB4u8h7T_7x5_'
];

urls.forEach(url => {
    console.log(`Input: ${url}`);
    console.log(`Output: ${getYouTubeEmbedUrl(url)}`);
    console.log('---');
});
