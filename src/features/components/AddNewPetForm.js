import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, FormControl, Button, Box } from '@material-ui/core';

export const AddNewPetForm = (props) => {
	const history = useHistory();
	const [name, setName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const postData = {};
		const data = new FormData(e.target);
		for(var item of data.entries()){
			postData[item[0]] = item[1]
		}

		props.savePets(postData)

		history.push('/dashboard')
	}

	return(
		<Box 
			component="form"
			aria-label="addNewPetForm"
			id="addNewPetForm"
			display="flex"
			flexDirection="column"
			onSubmit={handleSubmit}
		>
			<FormControl required={true}>
				<TextField 
					onChange={(e) => setName(e.target.value)}
					variant="outlined"
					id="name"
					label="name"
					name="name"
					value={name}
					type="text"
				/>
			</FormControl>
			<Button
				type="submit"
				disabled={!name}
				variant="contained"
				color="primary"
			>
				Save new pet
			</Button>
		</Box>
	);

}
