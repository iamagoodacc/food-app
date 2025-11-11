import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'


export default function Recipe(props) {
  return (
    <section>
      <h2>AI Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
      </article>
    </section>
  );
}
