import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Image, Button, Loader } from 'semantic-ui-react';

const CharacterDetail = () => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacter();
    }, [id]);

    const fetchCharacter = async () => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
            setCharacter(data);
        } catch (error) {
            console.error('Error fetching character:', error);
        }
        setLoading(false);
    };

    if (loading) {
        return <Loader active>Loading</Loader>;
    }

    if (!character) {
        return <div>Character not found</div>;
    }

    return (
        <div>
            <Button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
                Back to List
            </Button>

            <Card fluid>
                <Image src={character.image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{character.name}</Card.Header>
                    <Card.Meta>
                        <span>Status: {character.status}</span>
                    </Card.Meta>
                    <Card.Description>
                        <p>Species: {character.species}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Origin: {character.origin.name}</p>
                        <p>Location: {character.location.name}</p>
                        <p>Number of episodes: {character.episode.length}</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

export default CharacterDetail;