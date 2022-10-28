import { Link } from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div>
            <h2>
                {heading}
            </h2>
            <p>
            {paragraph} {' '}
            <Link to={linkUrl}>
                {linkName}
            </Link>
            </p>
        </div>
    )
}