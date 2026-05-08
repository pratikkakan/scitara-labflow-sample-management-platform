import StatusBadge from './StatusBadge.jsx';

export default function SampleTable({ samples }) {
  return (
    <div className="table-wrapper" data-testid="sample-table">
      <table>
        <thead>
          <tr>
            <th>Sample ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Location</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr data-testid="sample-row" key={sample.id}>
              <td>{sample.id}</td>
              <td>{sample.name}</td>
              <td>{sample.type}</td>
              <td>{sample.owner}</td>
              <td>
                <StatusBadge status={sample.status} />
              </td>
              <td>{sample.priority}</td>
              <td>{sample.location}</td>
              <td>{sample.collectedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
