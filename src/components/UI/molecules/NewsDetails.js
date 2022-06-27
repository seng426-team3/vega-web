const NewsDetails = ({news}) => {
	return (
		<div className="mt-2">
			<p class="text-left">{news.newsDate}</p>
			<h1>{news.title}</h1>
			<h2>{news.author}</h2>
			<p>{news.bodyText}</p>
		</div>
	);
}
export default NewsDetails;