export function ToastStack() {
  return (
    <div aria-live="polite" style={{ position: 'fixed', right: 12, bottom: 12 }}>
      <div style={{ background: '#222', color: '#fff', padding: 8 }}>Saved successfully</div>
    </div>
  );
}
