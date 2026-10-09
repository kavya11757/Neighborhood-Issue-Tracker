import { useState, useEffect } from 'react'

function App() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/issues')
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, location, description })
    });
    const newIssue = await res.json();
    setIssues([...issues, newIssue]);
    setTitle(''); setLocation(''); setDescription('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>🏠 Neighborhood Issue Tracker</h1>

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3 style={{ textAlign: 'center' }}>Report New Issue</h3>
        <form onSubmit={handleSubmit}>
          <input style={{ width: '100%', padding: '10px', margin: '8px 0', boxSizing: 'border-box' }} type="text" placeholder="Issue Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input style={{ width: '100%', padding: '10px', margin: '8px 0', boxSizing: 'border-box' }} type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <textarea style={{ width: '100%', padding: '10px', margin: '8px 0', boxSizing: 'border-box' }} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <button style={{ width: '100%', padding: '12px', background: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit Issue</button>
        </form>
      </div>

      <h3 style={{ textAlign: 'center', marginTop: '30px' }}>Reported Issues ({issues.length})</h3>
      {issues.map((issue, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px 0', background: 'white' }}>
          <strong>{issue.title}</strong> - {issue.location}<br/>
          {issue.description}<br/>
          <span style={{ background: '#ffeb3b', padding: '3px 10px', borderRadius: '10px', fontSize: '12px', marginTop: '5px', display: 'inline-block' }}>{issue.status || 'Open'}</span>
        </div>
      ))}
    </div>
  )
}

export default App