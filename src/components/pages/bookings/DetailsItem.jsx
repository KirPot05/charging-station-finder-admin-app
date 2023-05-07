function DetailsItem({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-x-2">
      <Icon className="h-4 w-4 text-gray-500" />
      <p className="">
        <span className="text-gray-500"> {title} : </span> <span>{value}</span>
      </p>
    </div>
  );
}

export default DetailsItem;
