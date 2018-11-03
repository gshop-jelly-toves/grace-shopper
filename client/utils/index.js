import axios from 'axios'

export async function getJelliesList(keyedJellies) {
  const jellyIds = Object.keys(keyedJellies)
  console.log('jellyids:',jellyIds)
  const jelliesPs = jellyIds.map(id => 
    axios.get(`/api/jellies/${id}`)  
  )
  const jelliesRes = await Promise.all(jelliesPs)
  return jelliesRes.map(jellyRes => jellyRes.data)
}