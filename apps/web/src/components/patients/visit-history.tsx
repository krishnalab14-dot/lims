type VisitHistoryItem = {
  id: string;
  visitDate: string;
  doctorReference: string;
  notes: string;
};

type VisitHistoryProps = {
  visits: VisitHistoryItem[];
};

export function VisitHistory({ visits }: VisitHistoryProps) {
  return (
    <section>
      <h2>Visit History</h2>
      <ul>
        {visits.map((visit) => (
          <li key={visit.id}>
            {visit.visitDate} — {visit.doctorReference} — {visit.notes}
          </li>
        ))}
      </ul>
    </section>
  );
}
