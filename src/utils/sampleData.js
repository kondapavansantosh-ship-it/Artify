const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
export const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750"><rect width="100%" height="100%" fill="#D8C3A5"/><text x="50%" y="50%" fill="#20201E" font-family="serif" font-size="32" text-anchor="middle">ARTIFY</text></svg>')
export const ARTISTS = {
  'Maya Laurent': U('photo-1494790108377-be9c29b29330', 200),
  'Daniel Okoye': U('photo-1507003211169-0a1dd7228f2d', 200),
  'Isla Fernsby': U('photo-1438761681033-6461ffad8d80', 200),
}
export const CATEGORIES = ['Abstract','Landscape','Portrait','Digital','Sculpture','Photography']
const rows = [
 ['Crimson Drift','Maya Laurent','Abstract',420,'photo-1541961017774-22349e4a1262','90 × 120 cm'],
 ['Colour Field No. 4','Maya Laurent','Abstract',560,'photo-1579783902614-a3fb3927b6a5','100 × 100 cm'],
 ['Blue Hour Study','Daniel Okoye','Abstract',380,'photo-1578301978693-85fa9c0320b9','70 × 90 cm'],
 ['Quiet Valley','Isla Fernsby','Landscape',650,'photo-1547891654-e66ed7ebb968','80 × 120 cm'],
 ['Morning Over the Ridge','Isla Fernsby','Landscape',480,'photo-1536924940846-227afb31e2a5','60 × 90 cm'],
 ['The Listener','Daniel Okoye','Portrait',720,'photo-1549490349-8643362247b5','50 × 70 cm'],
 ['Her Own Light','Maya Laurent','Portrait',690,'photo-1513364776144-60967b0f800f','60 × 80 cm'],
 ['Neon Reverie','Daniel Okoye','Digital',250,'photo-1561214115-f2f134cc4912','Digital print, 50 × 70 cm'],
 ['Pixel Garden','Isla Fernsby','Digital',210,'photo-1518998053901-5348d3961a04','Digital print, 40 × 60 cm'],
 ['Form in Marble','Maya Laurent','Sculpture',1200,'photo-1544967082-d9d25d867d66','45 × 30 × 30 cm'],
 ['Stillness','Daniel Okoye','Sculpture',980,'photo-1515405295579-ba7b45403062','35 × 25 × 25 cm'],
 ['City After Rain','Isla Fernsby','Photography',300,'photo-1460661419201-fd4cecdf8a8b','Archival print, 60 × 90 cm'],
]
export const seedArtworks = rows.map(([title,artist,category,price,img,dims],i) => ({
  id:'seed-'+(i+1), title, artist, category, price, dims, image:U(img), ownerId:null,
  desc:`${title} is an original ${category.toLowerCase()} work by ${artist}, made for living spaces that reward a second look. Ships framed and ready to hang.`,
  createdAt: Date.now() - i * 86400000 }))
