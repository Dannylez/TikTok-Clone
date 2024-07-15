import { useDropzone } from 'react-dropzone';
import styles from './styles.module.css';
import { UploadCloud } from '../../components/Icons/UploadCloud';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { publishVideo, uploadVideo } from '../../services';
import { useLocation } from 'wouter';

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [, navigate] = useLocation();

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
    if (uploaded) return <h4> Archivo cargado con éxito!</h4>;
    if (uploading) return <h4>Espere mientras su archivo se carga...</h4>;
    if (isDragReject) return <h4>Archivo no soportado</h4>;
    if (isDragAccept) return <h4> Suelta el archivo para subirlo!</h4>;

    return (
      <>
        <h4>Selecciona el video para cargar</h4>
        <h5>O arrastra y suelta un archivo</h5>
        <ul>
          <li>MP4 o WebM</li>
          <li>Resolución de al menos 720x1280</li>
          <li>Hasta 180 segundos</li>
        </ul>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploaded) return;
    const description = e.target.description.value;
    await publishVideo(description, fileUrl);
    navigate('/');
  };

  return (
    <div className={styles.upload}>
      <h1 className={styles.title}>Cargar video</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div {...getRootProps()}>
          <input name='video' {...getInputProps()} />
          <div className={dndClassNames}>
            <UploadCloud />
            {renderDndContent()}
          </div>
        </div>

        <label className={styles.label}>
          Descripción:
          <textarea name='description' className={styles.input}></textarea>
        </label>

        <button className={styles.button}>Publicar</button>
      </form>
    </div>
  );
}
