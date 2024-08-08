export function Items({ listGames, handleClickCard, handleDeleteGame }) {
    return (
      <div>
        {listGames.map((item) => (
          <Card
            key={item.id}
            {...item}
            onEdit={handleClickCard}
            onDelete={handleDeleteGame}
          />
        ))}
      </div>
    );
  }