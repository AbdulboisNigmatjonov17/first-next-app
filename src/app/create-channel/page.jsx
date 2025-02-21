"use client";
// import { useState } from "react";
// import { db, storage, auth } from "../../../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const CreateChannel = () => {
//     const [channelName, setChannelName] = useState("");
//     const [description, setDescription] = useState("");
//     const [profileImage, setProfileImage] = useState(null);

//     const handleCreateChannel = async (e) => {
//         e.preventDefault();
//         if (!channelName || !description || !profileImage) return alert("Fill all fields!");

//         try {
//             const user = auth.currentUser;
//             if (!user) return alert("Please sign in!");

//             // Rasmni Firebase Storage'ga yuklash
//             const imageRef = ref(storage, `channelImages/${profileImage.name}`);
//             await uploadBytes(imageRef, profileImage);
//             const imageUrl = await getDownloadURL(imageRef);

//             // Firestore'ga yangi kanal qo'shish
//             await addDoc(collection(db, "channels"), {
//                 userId: user.uid,
//                 channelName,
//                 description,
//                 profileImage: imageUrl,
//                 subscribersCount: 0,
//                 createdAt: new Date(),
//             });

//             alert("Channel Created!");
//         } catch (error) {
//             console.error("Error creating channel:", error);
//         }
//     };

//     return (
//         <div className="p-5 max-w-lg mx-auto">
//             <h2 className="text-xl font-bold mb-4">Create Your Channel</h2>
//             <form onSubmit={handleCreateChannel} className="space-y-4">
//                 <input type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)}
//                     placeholder="Channel Name" className="w-full p-2 border" />
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Description" className="w-full p-2 border"></textarea>
//                 <input type="file" placeholder="img" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full p-2" />
//                 <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create</button>
//             </form>
//         </div>
//     );
// };

// export default CreateChannel;
"use client";
import { useState } from "react";
import { db, storage, auth } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateChannel = () => {
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        if (!channelName || !description || !profileImage) {
            alert("Please fill all fields!");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("Please sign in!");
            return;
        }

        setLoading(true);

        const uploadImage = async (file) => {
            if (!file) return null;

            const imageRef = ref(storage, `channelImages/${file.name}`);

            try {
                // 🔹 Foydalanuvchi tokenini olish
                const user = auth.currentUser;
                if (!user) throw new Error("User not authenticated");

                const token = await user.getIdToken(); // ✅ User token olish

                // 🔹 Faylni yuklash
                const snapshot = await uploadBytes(imageRef, file);
                const imageUrl = await getDownloadURL(snapshot.ref);

                return imageUrl;
            } catch (error) {
                console.error("Error uploading image:", error);
                return null;
            }
        };


        try {
            // 🔹 Rasmni Firebase Storage'ga yuklash
            const imageRef = ref(storage, `channelImages/${profileImage.name}`);
            await uploadBytes(imageRef, profileImage);
            const imageUrl = await getDownloadURL(imageRef);

            // 🔹 Firestore'ga yangi kanal qo'shish
            await addDoc(collection(db, "channels"), {
                userId: user.uid,
                channelName,
                description,
                profileImage: imageUrl,
                subscribersCount: 0,
                createdAt: serverTimestamp(), // ✅ Firestore uchun to‘g‘ri vaqt formati
            });

            alert("Channel Created!");
            setChannelName("");
            setDescription("");
            setProfileImage(null);
        } catch (error) {
            console.error("Error creating channel:", error);
            alert("Failed to create channel. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Your Channel</h2>
            <form onSubmit={handleCreateChannel} className="space-y-4">
                <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Channel Name"
                    className="w-full p-2 border"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 border"
                ></textarea>
                <input
                    type="file"
                    accept="image/*" // ✅ Faqat rasm yuklash
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    className="w-full p-2"
                />
                <button
                    type="submit"
                    disabled={loading} // ✅ Tugma bosilganda bloklanadi
                    className={`p-2 w-full ${loading ? "bg-gray-400" : "bg-blue-500 text-white"}`}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
};

export default CreateChannel;
