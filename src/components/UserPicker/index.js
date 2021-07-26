import { useState, useEffect } from "react";
import { FaSpinner } from 'react-icons/fa';

const UserPicker = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3001/users')
			.then(res => res.json())
			.then(data => setUsers(data));
	}, []);

	if(!users.length){
		return <FaSpinner className="icon-loading" />
	}

	return (
		<select>
			{
				users.map((u, key) => (
					<option key={key} value={u.name}>{u.name}</option>
				))
			}
		</select>
	)
}

export default UserPicker;