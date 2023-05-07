function Badge({ content }) {
  return (
    <div className="bg-success text-white px-3 py-1 font-semibold text-xs rounded-full">
      {content}
    </div>
  );
}

export default Badge;
