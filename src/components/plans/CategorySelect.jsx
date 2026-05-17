const CategorySelect = ({ options, selected, onChange }) => {
  const toggleCategory = (categoryId) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((id) => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 p-3 border border-[#ccc] rounded-md bg-[white]"
      role="group"
      aria-label="Categories"
    >
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center gap-2 cursor-pointer text-[16px]"
        >
          <input
            type="checkbox"
            checked={selected.includes(option.id)}
            onChange={() => toggleCategory(option.id)}
          />
          <span>{option.name}</span>
        </label>
      ))}
    </div>
  );
};

export default CategorySelect;
