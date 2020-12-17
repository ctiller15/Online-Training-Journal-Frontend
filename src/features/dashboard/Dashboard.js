import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AddNewPetForm } from '../components/AddNewPetForm';
import { PetDetails } from '../components/PetDetails';
import { petsList, savePet, getLoggedInPets, updatePet } from '../dashboard/dashboardSlice';
import { Box } from '@material-ui/core';

export function Dashboard() {
  	const dispatch = useDispatch();
	const pets = useSelector(petsList);

	const savePets = (data) => {
		dispatch(savePet(data))
	}

	const handleUpdate = (body) => {
		dispatch(updatePet(body));
	}

	useEffect(() => {
		dispatch(getLoggedInPets());
	}, []);

	return (
    <div>
		<h1>Dashboard</h1>
		<Route path='/dashboard/pets/new' >
			<AddNewPetForm
				savePets={savePets}
			/>
		</Route>
		<Route path='/dashboard/pets/:petid' render={(props) => {
			return <PetDetails 
				name={props.location.petName} 
				id={props.match.params.petid}
				handleUpdate={handleUpdate}
				/>
		}}/>
		<Route path='/dashboard' exact>
			<Box>
				{pets.map((pet, index) => {
					return <RouterLink 
						key={index} 
						data-testid="pet" 
					to={
						{
						pathname: `/dashboard/pets/${pet.id}`,
						petName: pet.name
					}}>{pet.name}</RouterLink>
				})}
			</Box>
			<Button component={RouterLink} to="/dashboard/pets/new">Add new pet</Button>
		</Route>
    </div>
  );
}
