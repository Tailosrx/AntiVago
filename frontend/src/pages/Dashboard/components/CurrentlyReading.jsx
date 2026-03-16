export default function CurrentlyReading({ readings = [] }) {
  const currentlyReading = readings
    .filter(r => r.status === "reading")
    .slice(0, 3);

  if (currentlyReading.length === 0) {
    return (
      <div className="currently-empty">
        <p className="emoji">📚</p>
        <p className="title">Start Reading</p>
        <p className="subtitle">No books currently being read</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="currently-reading-title">🎯 Currently Consuming</h2>

      <div className="currently-grid">
        {currentlyReading.map(book => (
          <div key={book.id} className="currently-card">
            <div className="currently-cover">📖</div>

            <div className="currently-content">
              <div>
                <span className="currently-tag">BOOK</span>

                <h3 className="currently-title">{book.title}</h3>
                <p className="currently-author">{book.author}</p>
              </div>

              <div>
                <div className="currently-progress-labels">
                  <span>Progress</span>
                  <span>45%</span>
                </div>

                <div className="currently-progress-bar">
                  <div
                    className="currently-progress-fill"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
