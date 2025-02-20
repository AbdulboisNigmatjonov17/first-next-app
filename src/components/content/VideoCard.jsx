import Link from "next/link";

const VideoCard = ({ video }) => {
    return (
        <Link href={`/video/${video.id}`}>
            <div className="flex flex-col w-full">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <div className="w-full">
                    <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
                    <p className="text-gray-600">{video.channel}</p>
                    <p className="text-gray-500 text-sm">
                        {video.views} • {video.timestamp}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
