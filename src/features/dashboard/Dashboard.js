import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AddNewPetForm } from '../components/AddNewPetForm';
import { petsList, savePet } from '../dashboard/dashboardSlice';
import { Box } from '@material-ui/core';

export function Dashboard() {
  	const dispatch = useDispatch();
	const pets = useSelector(petsList);

	const savePets = (data) => {
		dispatch(savePet(data))
	}

	return (
    <div>
		<h1>Dashboard</h1>
		<Route path='/dashboard/pets/new' >
			<AddNewPetForm
				savePets={savePets}
			/>
		</Route>
		<Route path='/dashboard' exact>
			<Box>
				{pets.map((pet, index) => {
					return <RouterLink key={index} data-testid="pet" to={`/pets/${pet.id}`}>{pet.name}</RouterLink>
				})}
			</Box>
			<Button component={RouterLink} to="/dashboard/pets/new">Add new pet</Button>
		</Route>
    </div>
  );
}
