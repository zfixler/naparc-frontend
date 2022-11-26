import { useState, useEffect } from 'react';

function App() {
	const [searchInput, setSearchInput] = useState('');
	const [results, setResults] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();
		const url = 'https://naparc-puppeteer.onrender.com';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ zip: searchInput }),
		});
		const data = await response.json();

		setResults(data);
	}

	return (
		<div>
			<h1>Search for Congregations</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button>Search</button>
			</form>
			{results.length &&
				results[0].map((result, i) => {
					return (
						<div key={i}>
							<h2>{result.name}</h2>
              {result.pastor && <p>Pastor: {result.pastor}</p>}
              {result.contact && <p>Contact: {result.contact}</p>}
							<address>{result.address}</address>
							<p>{result.phone}</p>
              <a href={`mailto:${result.email}`}>Email</a>
              <br />
              <a href={result.website}>Website</a>
						</div>
					);
				})}
		</div>
	);
}

export default App;
