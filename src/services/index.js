import {supabase} from './supabase'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

export const uploadVideo = async ({videoFile}) => {
    const filename= window.crypto.randomUUID()
const {data, error} = await supabase.storage    
    .from('videos')
    .upload(`uploads/${filename}.mp4`, videoFile)
    const file = data?.fullPath ? `${prefix}${data.fullPath}` : ''
    return[error, file]
}

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