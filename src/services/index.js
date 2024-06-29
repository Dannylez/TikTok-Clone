import {supabase} from './supabase'

export const getVideos = async () => {
    let { data, error } = await supabase
  .from('videos')
  .select(`*, users (*), songs(*)`)

  return [error,data]
}