import {supabase} from './supabase'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

/* export const uploadVideo = async ({videoFile}) => {
    const filename= window.crypto.randomUUID()
const {data, error} = await supabase.storage    
    .from('videos')
    .upload(`uploads/${filename}.mp4`, videoFile)
    const file = data?.fullPath ? `${prefix}${data.fullPath}` : ''
    return[error, file]
} */

    export const uploadVideo = async ({ videoFile }) => {
      const MAX_SIZE_MB = 50; // Tamaño máximo en MB
      const MAX_DURATION_SECONDS = 60; // Duración máxima en segundos
    
      // Validar tamaño del archivo
      const fileSizeMB = videoFile.size / (1024 * 1024); // Convertir a MB
      if (fileSizeMB > MAX_SIZE_MB) {
        return [new Error('El tamaño del video supera el límite permitido de 50 MB'), ''];
      }
    
      // Crear un objeto de video para obtener la duración
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(videoFile);
    
      return new Promise((resolve) => {
        videoElement.onloadedmetadata = async () => {
          const duration = videoElement.duration;
          if (duration > MAX_DURATION_SECONDS) {
            return resolve([new Error('La duración del video supera el límite permitido de 60 segundos'), '']);
          }
    
          // Si pasa las validaciones, proceder a subir
          const filename = window.crypto.randomUUID();
          const { data, error } = await supabase.storage
            .from('videos')
            .upload(`uploads/${filename}.mp4`, videoFile);
          const file = data?.fullPath ? `${prefix}${data.fullPath}` : '';
    
          resolve([error, file]); // Resolvemos la promesa aquí
        };
    
        videoElement.onerror = () => {
          resolve([new Error('Error al cargar los metadatos del video'), '']);
        };
      });
    };

export const publishVideo = async (description, videoSrc) => {
    const { data, error } = await supabase
    .from('videos')
    .insert([
        {
        user_id:'a905c014-ae1f-47c6-b328-612facdf7b29', 
        src: videoSrc, 
        song: '1', 
        description
    }
    ])

    return [error, data]
}

export const getVideos = async () => {
    let { data, error } = await supabase
  .from('videos')
  .select(`*, users (*), songs(*)`) 
  .order('created_at', {ascending: false})

  return [error, data]
}

export const getLikes = async () => {
    let { data, error } = await supabase
  .from('users_videos_likes')
  .select('*') 

  return [error, data]
}

export const addLike = async ( userId, videoId, videoLikes) => {
    const { data1, error1 } = await supabase
  .from('videos')
  .update({ likes: videoLikes+1 })
  .eq('id', videoId)
  .select();

  const { data2, error2 } = await supabase
  .from('users_videos_likes')
  .insert([
    { user_id: userId, video_id: videoId },
  ])
  .select()

  console.log(data1, error1, data2, error2)
}

export const removeLike = async (userId, videoId, videoLikes) => {
    const { data, error1 } = await supabase
  .from('videos')
  .update({ likes: videoLikes-1 })
  .eq('id', videoId)
  .select();

  const { error2 } = await supabase
  .from('users_videos_likes')
  .delete()
  .match({'video_id': videoId, 'user_id': userId} )
}