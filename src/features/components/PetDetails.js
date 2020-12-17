import { useState } from 'react';
import { Button } from '@material-ui/core'

export const PetDetails = (props) => {
	const [ editMode, setEditMode ] = useState(false);
	const [ petName, setPetName ] = useState(props.name);

	const handleEditMode = () => {
		setEditMode(!editMode);
	}

	const handleNameChange = (e) => {
		setPetName(e.target.value);
	}

	const handleUpdate = (e) => {
		e.preventDefault();
		const body = {
			id: props.id,
			name: petName
		}
		props.handleUpdate(body);
	}

	return (
		<form onSubmit={handleUpdate}>
			{
				!editMode ? 
					<h1>{petName}</h1>
					: <input 
						name="pet-name" 
						value={ petName } 
						type="text"
						onChange={ handleNameChange }></input>
			}
			<Button onClick={handleEditMode}>Edit</Button>
			<Button 
				type="submit">Save Changes</Button>
		</form>
	)
}
