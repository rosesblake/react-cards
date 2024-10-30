function Card({ card, index }) {
  return (
    <div
      style={{
        position: "absolute",
        top: index * 5,
        left: index * 5,
        zIndex: index,
      }}
    >
      <img src={card.image} alt={card.value} />
    </div>
  );
}

export default Card;
