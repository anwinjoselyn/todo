const SelectPanel = ({ list, onSelect }: any) => {
  return (
    <div className="flex">
      {list &&
        list.length > 0 &&
        list.map((item: any, index: number) => (
          <span
            key={item.key}
            className={`cursor-pointer w-24 truncate mx-1 text-sm text-center p-1 border border-border-color-dark rounded-lg ${
              item.selected ? 'bg-gray-darkest text-gray-lightest' : ''
            }`}
            role="presentation"
            onClick={() => onSelect(index)}
          >
            {item.label}
          </span>
        ))}
    </div>
  );
};

export default SelectPanel;
