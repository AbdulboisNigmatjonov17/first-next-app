"use client";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from "firebase/firestore";

const Comments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showAll, setShowAll] = useState(false);

    // Commentlarni olish
    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, "comments"), where("videoId", "==", videoId), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            setComments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchComments();
    }, [videoId]);

    // Yangi comment qo‘shish
    const addComment = async () => {
        if (!newComment.trim()) return;

        const newCommentData = {
            videoId,
            username: "User", // Bu joyga auth bilan haqiqiy user keladi
            text: newComment,
            timestamp: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, "comments"), newCommentData);

        // Yangi qo‘shilgan comment'ni state'ga qo‘shish
        setComments([{ id: docRef.id, ...newCommentData }, ...comments]);

        setNewComment(""); // Inputni tozalash
    };

    return (
        <div className="mt-5">
            <h2 className="text-lg font-semibold">Comments</h2>

            {/* Yangi comment qo‘shish */}
            <div className="flex gap-3 mt-3">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="border p-2 flex-1 rounded-md"
                />
                <button onClick={addComment} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Send
                </button>
            </div>

            {/* Commentlar ro‘yxati */}
            <div className="mt-3">
                {(showAll ? comments : comments.slice(0, 3)).map((comment) => (
                    <div key={comment.id} className="border-b py-2">
                        <p className="text-sm font-semibold">{comment.username}</p>
                        <p className="text-gray-600">{comment.text}</p>
                    </div>
                ))}
            </div>

            {/* Show all / Show less tugmalari */}
            {comments.length > 3 && (
                <button onClick={() => setShowAll(!showAll)} className="text-blue-500 mt-2">
                    {showAll ? "Show less" : "Show all"}
                </button>
            )}
        </div>
    );
};

export default Comments;
