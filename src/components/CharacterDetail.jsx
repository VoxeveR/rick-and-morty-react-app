import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Button,
    Image,
    Loader,
    Dimmer,
    Container,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Icon
} from 'semantic-ui-react';
import axios from 'axios';
import { handleGenderIcon, handleStatusIcon } from './characterUtils';
import "./CharacterDetails.css";

const CharacterDetail = () => {
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLarge, setIsLarge] = useState(false);

    const charactersCount = location.state?.charactersCount || 826;
    const currentId = Number(id);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => {
                setCharacter(response.data);
            })
            .catch((error) => {
                console.error(error);
                setCharacter(null);
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    const toggleImageSize = () => {
        setIsLarge(!isLarge);
    };

    const handleNavigation = (direction) => {
        const newId = direction === 'prev' ? currentId - 1 : currentId + 1;
        if (newId > 0 && newId <= charactersCount) {
            navigate(`/character/${newId}`, { state: { charactersCount } });
        }
    };

    if (isLoading) {
        return (
            <Dimmer active>
                <Loader active>Loading</Loader>
            </Dimmer>
        );
    }

    if (!character) {
        return (
            <Dimmer active>
                <h1>Character not found</h1>
                <Button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
                    Back to List
                </Button>
            </Dimmer>
        );
    }

    return (
        <div className="character-detail-container">
            <div className="detail-navbar">
                <Button
                    icon
                    labelPosition='left'
                    onClick={() => navigate('/')}
                    className="nav-button back-button"
                >
                    <Icon name='arrow left'/>
                    Back to Characters
                </Button>

                <div className="nav-controls">
                    <Button
                        icon
                        labelPosition='left'
                        disabled={currentId <= 1}
                        onClick={() => handleNavigation('prev')}
                        className="nav-button"
                    >
                        <Icon name='arrow left'/>
                        Previous
                    </Button>

                    <span className="id-counter">
                {currentId} / {charactersCount}
            </span>

                    <Button
                        icon
                        labelPosition='right'
                        disabled={currentId >= charactersCount}
                        onClick={() => handleNavigation('next')}
                        className="nav-button"
                    >
                        Next
                        <Icon name='arrow right'/>
                    </Button>
                </div>
            </div>

            <Container style={{
                flex: 1,
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Table collapsing textAlign="center" style={{margin: '0 auto'}}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>
                                <h1 style={{margin: 0}}>
                                    {character.name}
                                </h1>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="center-image">
                                    <Image
                                        size={isLarge ? 'big' : 'medium'}
                                        src={character.image}
                                        onClick={toggleImageSize}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    />
                                </div>
                                <div
                                    onClick={toggleImageSize}
                                    style={{
                                        cursor: 'pointer',
                                        marginTop: '1rem',
                                        color: '#2185d0',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Icon name="magnify"/>
                                    {isLarge ? ' Zoom Out' : ' Zoom In'}
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell><strong>Status:</strong> {character.status} {handleStatusIcon(character.status)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Species:</strong> {character.species}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Type:</strong> {character.type || 'Unknown'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Gender:</strong> {character.gender} {handleGenderIcon(character.gender)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Origin:</strong> {character.origin.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Location:</strong> {character.location.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Episodes:</strong> {character.episode.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Created:</strong> {new Date(character.created).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Container>
        </div>
    );
};

export default CharacterDetail;