import {supabase} from './supabase'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

    export const uploadVideo = async ({ videoFile }) => {
      const MAX_SIZE_MB = 50;
      const MAX_DURATION_SECONDS = 30;

      const fileSizeMB = videoFile.size / (1024 * 1024);

      if (fileSizeMB > MAX_SIZE_MB) {
        return [new Error('Your video excedes the weight limit (50MB) please, try with another'), ''];
      }

      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(videoFile);
    
      return new Promise((resolve) => {
        videoElement.onloadedmetadata = async () => {
          const duration = videoElement.duration;
          if (duration > MAX_DURATION_SECONDS) {
            return resolve([new Error('Your video excedes the length limit (30 seconds) please, try with a shorter one'), '']);
          }
    
          const filename = window.crypto.randomUUID();
          const { data, error } = await supabase.storage
            .from('videos')
            .upload(`uploads/${filename}.mp4`, videoFile);
          const file = data?.fullPath ? `${prefix}${data.fullPath}` : '';
    
          resolve([error, file]);
        };
    
        videoElement.onerror = () => {
          resolve([new Error('Error. Please, try again'), '']);
        };
      });
    };

export const publishVideo = async (description,song, videoSrc, userId) => {
    const { data, error } = await supabase
    .from('videos')
    .insert([
        {
        user_id: userId, 
        src: videoSrc, 
        song: song, 
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

export const getUsers = async () => {
   let {data, error} = await supabase
   .from('users')
   .select('*')

   return [error, data]
}

export const getSongs = async () => {
  let {data, error} = await supabase
  .from('songs')
  .select('*')

  return [error, data]
}