import StatusBadge from './StatusBadge.jsx';

export default function SampleTable({ samples }) {
  return (
    <div className="table-wrapper" data-testid="sample-table">
      <table>
        <thead>
          <tr>
            <th>Sample ID</th>
            <th>Sample Name</th>
            <th>Scientist</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr data-testid="sample-row" key={sample.id}>
              <td>{sample.id}</td>
              <td>{sample.sampleName}</td>
              <td>{sample.scientist}</td>
              <td>
                <StatusBadge status={sample.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
