"use client";
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [channelId, setChannelId] = useState("");

  useEffect(() => {
    const fetchChannel = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "channels"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setChannelId(querySnapshot.docs[0].id);
      }
    };

    fetchChannel();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !description || !video || !channelId) return alert("Fill all fields!");

    try {
      const user = auth.currentUser;
      if (!user) return alert("Please sign in!");

      // Videoni Firebase Storage'ga yuklash
      const videoRef = ref(storage, `videos/${video.name}`);
      await uploadBytes(videoRef, video);
      const videoUrl = await getDownloadURL(videoRef);

      // Firestore'ga video qo'shish
      await addDoc(collection(db, "videos"), {
        userId: user.uid,
        channelId,
        title,
        description,
        videoUrl,
        views: 0,
        createdAt: new Date(),
      });

      alert("Video Uploaded!");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Video Title" className="w-full p-2 border" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Description" className="w-full p-2 border"></textarea>
        <input type="file" onChange={(e) => setVideo(e.target.files[0])} className="w-full p-2" />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Upload</button>
      </form>
    </div>
  );
};

export default UploadVideo;
