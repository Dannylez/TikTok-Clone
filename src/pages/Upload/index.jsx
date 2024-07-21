import { useDropzone } from 'react-dropzone';
import styles from './styles.module.css';
import { UploadCloud } from '../../components/Icons/UploadCloud';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getSongs, publishVideo, uploadVideo } from '../../services';
import { useLocation } from 'wouter';

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [, navigate] = useLocation();
  const [user, setUser] = useState({});
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setUser(window.history.state.user);
    getSongs().then(([error, songs]) => {
      if (error) return setError(error);
      setSongs(songs);
    });
  }, []);

  const onDrop = async (files) => {
    const [file] = files;
    if (!file) {
      setErrorMessage('Formato no soportado, prueba con otro archivo');
      return;
    }
    try {
      setErrorMessage('');
      setUploading(true);
      const [error, fileUrl] = await uploadVideo({ videoFile: file });
      if (error) {
        setUploading(false);
        return setErrorMessage(error.message);
      }
      setFileUrl(fileUrl);
      setUploading(false);
      setUploaded(true);
    } catch (error) {
      setUploading(false);
      setErrorMessage(error);
    }
  };

  const { isDragAccept, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      disabled: uploading || uploaded,
      maxFiles: 1,
      accept: {
        'video/mp4': ['.mp4'],
        'video/x-m4v': ['.m4v'],
        'video/*': [],
      },
      onDrop,
    });

  const dndClassNames = clsx(styles.dnd, {
    [styles.dndReject]: isDragReject || errorMessage,
    [styles.dndAccept]: isDragAccept || uploaded,
  });

  const renderDndContent = () => {
    if (errorMessage) return <h4>{errorMessage}</h4>;
    if (uploaded) return <h4> Video uploaded successfully!</h4>;
    if (uploading) return <h4>Uploading your video, please wait...</h4>;
    if (isDragReject) return <h4>File not supported</h4>;
    if (isDragAccept) return <h4> Drop your video here!</h4>;

    return (
      <>
        <h4>Select your video to upload</h4>
        <h5>Or drag and drop it!</h5>
        <ul>
          <li>MP4 o WebM</li>
          <li>Max weigth: 50MB</li>
          <li>Max length: 30 seconds</li>
        </ul>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploaded) return;
    const description = e.target.description.value;

    const song = e.target.song.value ? e.target.song.value : null;

    await publishVideo(description, song, fileUrl, user.id);
    navigate('/feed', { state: window.history.state });
  };

  return (
    <div className={styles.upload}>
      <h1 className={styles.title}>Upload video</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div {...getRootProps()}>
          <input name='video' {...getInputProps()} />
          <div className={dndClassNames}>
            <UploadCloud />
            {renderDndContent()}
          </div>
        </div>

        <label className={styles.label}>
          Description:
          <textarea name='description' className={styles.input}></textarea>
        </label>
        <label className={styles.label}>
          Song:
          <select className={styles.input} name='song'>
            <option value=''>None</option>
            {songs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title}
              </option>
            ))}
          </select>
        </label>

        <button className={styles.button}>Publish</button>
      </form>
    </div>
  );
}
