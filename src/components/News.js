export default function News({ article }) {
  return (
    <a rel="noreferrer" href={article.url} target="_blank">
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
        <div className="space-y-.5">
            <h6 className="font-bold text-sm">{article.title}</h6>
            <p className="text-gray-500 text-sm">{article.source.name}</p>
        </div>
        <img className="rounded-xl" width={"70"} src={article.urlToImage} alt="News Image" />
      </div>
    </a>
  )
}
