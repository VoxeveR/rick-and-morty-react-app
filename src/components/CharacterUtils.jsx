import { Icon } from 'semantic-ui-react';

export function handleGenderIcon(gender) {
    switch (gender.toLowerCase()) {
        case 'male':
            return <Icon name="man" color="blue" />
        case 'female':
            return <Icon name="woman" color="pink" />
        case 'genderless':
            return <Icon name="genderless" color="orange" />
        case 'unknown':
            return <Icon name="question circle" color="red" />
        default:
            return;
    }
}

export function handleStatusIcon(status) {
    switch (status.toLowerCase()) {
        case 'alive':
            return <Icon name="circle" color="green" />
        case 'dead':
            return <Icon name="circle" color="red" />
        case 'unknown':
            return <Icon name="question circle" color="gray" />
        default:
            return;
    }
}