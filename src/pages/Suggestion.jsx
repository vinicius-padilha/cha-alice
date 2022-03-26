import { Fragment } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/Suggestion.css'

export function Suggestion() {
  const location = useLocation();
  const { uuid, name, suggestion } = location?.state || {uuid: '', name: '', suggestion: []};

  return (
    <div className="suggestion container">
      <Link to={`/${uuid}`}>
        <img src="/logo-horizontal.png" alt="Chá da Alice" />
      </Link>
      <h2>Presença confirmada! ✔️ 👼🏻</h2>
      {uuid && <h3>Sua sugestão de presente é:</h3>}

      {
        suggestion.map((item, index) => (
          <Fragment key={item.title}>
            <p>{item.title}</p>
            <div className="suggestion-image-holder">
              <img src={item.src} alt="Imagem Sugestão" />
            </div>
            {index + 1 !== suggestion.length && <span>+</span>}
          </Fragment>
        ))
      }
    </div>
  )
}