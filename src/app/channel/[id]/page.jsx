"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

const ChannelPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const channelDoc = await getDoc(doc(db, "channels", id));
      if (channelDoc.exists()) {
        setChannel(channelDoc.data());
      }
    };

    const fetchVideos = async () => {
      const q = query(collection(db, "videos"), where("channelId", "==", id));
      const querySnapshot = await getDocs(q);
      setVideos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchChannel();
    fetchVideos();
  }, [id]);

  if (!channel) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{channel.channelName}</h1>
      <p>{channel.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border p-2">
            <h3 className="font-bold">{video.title}</h3>
            <p>{video.description}</p>
            <video src={video.videoUrl} controls className="w-full"></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
