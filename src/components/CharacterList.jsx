import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Pagination,
    Loader, Image,
    Container,
    Dimmer,
    Card,
    CardContent,
    CardMeta,
    CardHeader, Grid, GridRow, GridColumn, Dropdown
} from 'semantic-ui-react';
import axios from 'axios';
import {handleGenderIcon, handleStatusIcon} from './characterUtils';
import "./CharacterList.css"

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [charactersCount, setCharactersCount] = useState(0);
    const navigate = useNavigate();
    const statusOptions = [
        {key: 'alive', text: 'Alive', value: 'alive'},
        {key: 'dead', text: 'Dead', value: 'dead'},
        {key: 'unknown', text: 'Unknown', value: 'unknown'},
    ];

    useEffect(() => {
        fetchCharacters();
    }, [pageNumber, status]);

    const fetchCharacters = async () => {
        setIsLoading(true);
        let statusFilter = status ? `&status=${status}` : '';
        axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}${statusFilter}`).then((response) => {
            setCharacters(response.data.results);
            setTotalPages(response.data.info.pages);
            setCharactersCount(response.data.info.count);
        }).catch((error) => {
            console.log(error);
        }).finally(() => setIsLoading(false));
    }

    function handlePageChange(e, {activePage}) {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setPageNumber(activePage);
    }

    function handleStatusChange(e, {value}) {
        setStatus(value);
        setPageNumber(1);
    }

    if (isLoading) {
        return (
            <Dimmer active>
                <Loader active>Loading</Loader>
            </Dimmer>
        )
    }

    return (
        <div className="wrapper">
            <header className="fancy-header">
                <div className="header-content">
                    <h1>Rick and Morty Characters</h1>
                    <p className="character-count">
                        {charactersCount === 0 ? 'Searching multiverse...' : `Found ${charactersCount} characters`}
                    </p>
                </div>
            </header>
            <Container style={{
                height: "100%"
            }}>
                <div
                    className="filter" style={{
                    textAlign: "right",
                    marginBottom: "1rem"
                }}
                >Filter:
                    <Dropdown
                        placeholder="Select Status"
                        selection
                        clearable
                        options={statusOptions}
                        onChange={handleStatusChange}
                        value={status}
                        style={{marginLeft: '0.5rem'}}
                    />
                </div>
                <Grid columns={5}
                      container
                      stackable
                      verticalAlign='middle'
                      doubling
                      centered
                      textAlign={'left'}
                >
                    {characters.reduce((rows, character, index) => {
                        if (index % 5 === 0) rows.push([]);
                        rows[rows.length - 1].push(character);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <GridRow key={rowIndex}>
                            {row.map((character, index) => (
                                <GridColumn key={index}>
                                    <Card
                                        onClick={() => navigate(`/character/${character.id}`, {state: {charactersCount}})}>
                                        <Image
                                            src={character.image}
                                            wrapped
                                            ui={false}
                                        />
                                        <CardContent>
                                            <CardHeader>{character.name}
                                                <span style={{float: 'right'}}>
                                                    {handleGenderIcon(character.gender)}
                                                </span>
                                            </CardHeader>
                                            <CardMeta>
                                                <span
                                                    style={{textTransform: "capitalize"}}>{handleStatusIcon(character.status)} {character.status} - {character.species}
                                                </span>
                                            </CardMeta>
                                        </CardContent>
                                    </Card>
                                </GridColumn>
                            ))}
                        </GridRow>
                    ))}
                </Grid>
                <div
                    style={{textAlign: 'center'}}
                >
                    <Pagination style={{marginTop: '1rem', marginBottom: '1rem'}}
                                activePage={pageNumber}
                                onPageChange={handlePageChange}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={totalPages}
                    />
                </div>
            </Container>
        </div>
    );
};

export default CharacterList;