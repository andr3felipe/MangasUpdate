import { MangaDiv } from "./MangaCard";

export function MangaCard({ name, chapter, link, img }) {
  return (
    <MangaDiv>
      <img src={img}/>
      <h4>{name}</h4>
      <a href={link}>{chapter?.replace("\n", " | ")}</a>
    </MangaDiv>
  )
}