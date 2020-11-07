import React, { useState } from 'react';
import { TextField, FormControl, Button, Box } from '@material-ui/core';

export const AddNewPetForm = (props) => {
	const [name, setName] = useState("");

	const handleSubmit = () => {}

	return(
		<Box 
			component="form"
			aria-label="addNewPetForm"
			display="flex"
			flexDirection="column"
			onSubmit={handleSubmit}
		>
			<FormControl>
				<TextField 
					onChange={(e) => setName(e)}
					variant="outlined"
					id="name"
					label="name"
					value={name}
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
