import React from 'react';
import {useGuests} from '../../controllers/guests.controllers';

interface Guests{
  id: number;
  id_guest: number;
  full_name: string;
  attending: any;
	invitation_text: string;
	plus_one: any;
	family: any;
}

const GuestTable: React.FC = () => {

	const {guests, loading, error}: any = useGuests();	

  const data: Guests[] = guests;

  return (
		<table>
			<thead>
				<tr>
					<th className = "th_header">id</th>
					<th className = "th_header">id семьи</th>
					<th className = "th_header">ФИО гостя</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={row.id}>
						<td className = "th_body id">{row.id} <i className = "icon-cogs"></i></td>
						<td className = "th_body">{row.id_guest}</td>
						<td className = "th_body">{row.full_name}</td>
					</tr>
				))}
			</tbody>
		</table>
  );
};

export default GuestTable;
