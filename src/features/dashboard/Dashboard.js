import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AddNewPetForm } from '../components/AddNewPetForm';
/*import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';*/
//import styles from './Counter.module.css';

export function Dashboard() {
	//const count = useSelector(selectCount);
  const dispatch = useDispatch();
  //const [incrementAmount, setIncrementAmount] = useState('2');

	return (
    <div>
		<h1>Dashboard</h1>
		<Route path='/dashboard/pets/new' >
			<AddNewPetForm />
		</Route>
		<Route path='/dashboard' exact>
			<Button component={RouterLink} to="/dashboard/pets/new">Add new pet</Button>
		</Route>
    </div>
  );
}
