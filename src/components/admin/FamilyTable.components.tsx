import React from 'react';
import '../../styles/admin/familyTable.styles.scss'
import {useFamilies} from '../../controllers/family.controllers';

interface FirstTableRow {
  id: number;
  family_name: string;
  text: string;
	presence: any;
}

const FamilyTable: React.FC = () => {

	const {families, loading, error}: any = useFamilies();	

  const data: FirstTableRow[] = families;

  return (
		<table>
			<thead>
				<tr>
					<th className = "th_header">id</th>
					<th className = "th_header">Фамилия</th>
					<th className = "th_header">Текст приглашения</th>
					<th className = "th_header">Присутствие</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={row.id}>
						<td className = "th_body id ">{row.id} <i className = "icon-cogs"></i></td>
						<td className = "th_body">{row.family_name}</td>
						<td className = "th_body">{row.text}</td>
						<td className = "th_body">{!row.presence ? "-" : "+"}</td>
					</tr>
				))}
			</tbody>
		</table>
  );
};

export default FamilyTable;
