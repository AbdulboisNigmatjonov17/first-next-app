import YouTube from 'react-youtube';

export default function VideoPlayer() {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,  // 1 - avtomatik boshlaydi, 0 - boshlamaydi
        },
    };

    return <YouTube videoId="dQw4w9WgXcQ" opts={opts} />;
}
