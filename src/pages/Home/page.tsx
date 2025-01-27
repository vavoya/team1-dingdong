import { useNavigate } from 'react-router-dom';

export default function Page() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/protected', { state: { fromLink: true } });
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleButtonClick}>Go to Protected (via Button)</button>
        </div>
    );
}
