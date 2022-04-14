import React from 'react'
import { useState } from 'react';
import { storage, db } from '../Firebase';
import firebase from 'firebase/compat';
import "./Image__upload.css";

export const ImageUpload = ({ username, barVisibility }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [progressVisibilty, setProgressVisibility] = useState(false);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        setProgressVisibility(true);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress function
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                // error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                        setProgressVisibility(false);
                    })
            }
        )
    }
    return (
        <div>
            {
                barVisibility ? (
                    <div className="image__upload">
                        {
                            progressVisibilty ?
                                (
                                    <progress value={progress} max="100" />
                                ) : ""
                        }
                        <input type="text"
                            value={caption}
                            placeholder="Enter Caption Here.."
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <input type="file" onChange={handleChange} />
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                ) : ""
            }
        </div>
    )
}