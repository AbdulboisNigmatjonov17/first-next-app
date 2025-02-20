"use client";

import VideoCard from "@/components/content/VideoCard";
import Sidebar from "../components/sidebar/SideBar";
import { videoData } from "@/components/content/data";

export default function Home() {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videoData.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
