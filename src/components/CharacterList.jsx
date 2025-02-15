import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Pagination,
    Loader, Image,
    Container,
    Dimmer,
    Card,
    CardContent,
    CardMeta,
    Icon, CardHeader, Grid, GridRow, GridColumn, Dropdown, DropdownItem, DropdownMenu
} from 'semantic-ui-react';
import axios from 'axios';
import "./CharacterList.css"

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const statusOptions = [
        { key: 'alive', text: 'Alive', value: 'alive' },
        { key: 'dead', text: 'Dead', value: 'dead' },
        { key: 'unknown', text: 'Unknown', value: 'unknown' },
    ];

    useEffect (() => {
        let promise = fetchCharacters();
        console.log("promise: " + promise);

    }, [pageNumber, status]);

    const fetchCharacters = async () => {
        setIsLoading(true);
        let statusFilter = status ? `&status=${status}` : '';
        console.log("statusFilter: " + statusFilter);
        console.log("status: " + status);
        axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}${statusFilter}`).then((response) => {
            console.log(response);
            setCharacters(response.data.results);
            setTotalPages(response.data.info.pages);
            console.log(response.data.totalPages);
            setIsLoading(false);
            console.log(response.data.results);
        }).catch((error) => {
            console.log(error);
        })
    }

    function handlePageChange(e, {activePage}) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPageNumber(activePage);
    }

    function handleStatusChange(e, {value}) {
        setStatus(value);
        setPageNumber(1);
    }

    function handleGenderIcon(gender){
        switch (gender.toLowerCase()) {
            case 'male':
                return <Icon name="man" color="blue" />
            case 'female':
                return <Icon name="woman" color ="pink" />
            case 'genderless':
                return <Icon name="genderless" color="orange" />
            case 'unknown':
                return <Icon name="question circle" color="red" />
            default:
                return;
        }
    }

    function handleStatusIcon(status){
        switch (status.toLowerCase()) {
            case 'alive':
                return <Icon name="circle" color="green" />
            case 'dead':
                return <Icon name="circle" color ="red" />
            case 'unknown':
                return <Icon name="question circle" color="gray" />
            default:
                return;
        }
    }

    if (isLoading) {
        return (
            <Dimmer active>
                <Loader active>Loading</Loader>
            </Dimmer>
        )
    }



    return (

        <Container style={{justifyContent: 'space-between', marginTop: "1rem"}}>
            <div className="filter" style={{textAlign: "right", marginBottom: "1rem"}}>Filter:
                <Dropdown
                    placeholder="Select Status"
                    selection
                    clearable
                    options={statusOptions}
                    onChange={handleStatusChange}
                    value={status}
                    style={{ marginLeft: '0.5rem' }}
                />
            </div>
            <Grid columns={5} centered stackable verticalAlign='middle'>
                {characters.reduce((rows, character, index) => {
                    if (index % 5 === 0) rows.push([]);
                    rows[rows.length - 1].push(character);
                    return rows;
                }, []).map((row, rowIndex) => (
                    <GridRow key={rowIndex}>
                        {row.map((character, index) => (
                            <GridColumn key={index}>
                                <Card style={{maxWidth: 200}} onClick={() => navigate('/character/' + character.id)}>
                                    <Image src={character.image} wrapped ui={false}/>
                                    <CardContent>
                                        <CardHeader>{character.name} <span
                                            style={{float: 'right'}}>{handleGenderIcon(character.gender)}</span></CardHeader>
                                        <CardMeta>
                                            <span style={{textTransform:"capitalize"}}>{handleStatusIcon(character.status)} {character.status} - {character.species}</span>
                                        </CardMeta>
                                    </CardContent>
                                </Card>
                            </GridColumn>
                        ))}
                    </GridRow>
                ))}
            </Grid>
            <div style={{textAlign: 'center'}}>
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
    );
};

export default CharacterList;