"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { videoData } from "../../../components/content/data";
import Comments from "../../../components/comment/Comment";
import Link from "next/link";
import YouTube from "react-youtube";

const VideoPage = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const foundVideo = videoData.find((v) => v.id.toString() === id);
        setVideo(foundVideo);
    }, [id]);

    const relatedVideos = useMemo(() => {
        return videoData
            .filter((v) => v.id !== video?.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
    }, [video]);

    if (!video) return <h1 className="text-center text-2xl">Video Not Found</h1>;

    return (
        <div className="flex flex-col md:flex-row p-5 gap-5">
            <div className="w-full md:w-2/3">
                {/* <iframe
                    className="w-full h-[400px] rounded-lg"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allowFullScreen
                ></iframe> */}
                {/* <iframe src="https://player.vimeo.com/video/76979871" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe> */}
                {/* <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe> */}
                <YouTube />
                <h1 className="text-2xl font-bold mt-3">{video.title}</h1>
                <Comments videoId={video.id} />
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-3">
                {relatedVideos.map((v) => (
                    <Link key={v.id} href={`/video/${v.id}`}>
                        <div className="flex gap-2 items-center">
                            <img src={v.thumbnail} alt={v.title} className="w-32 h-20 rounded" loading="lazy" />
                            <p>{v.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VideoPage;