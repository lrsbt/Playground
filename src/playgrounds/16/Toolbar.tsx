import { ICONS } from "./const";

interface Props {
  selectedCell: [number, number];
  handeSetCellData: (x: number, y: number, name: string, icon: string) => void;
}

const Toolbar = ({ handeSetCellData, selectedCell }: Props) => {
  if (!selectedCell) return;

  const [x, y] = selectedCell;

  return (
    <div className="toolbar">
      {Object.entries(ICONS).map(([name, icon], v) => {
        const handleSelect = () => {
          handeSetCellData(x, y, name, icon);
        };

        return (
          <a className="toolbar-icon" key={name} onClick={handleSelect}>
            <img src={icon} />
          </a>
        );
      })}
    </div>
  );
};

export { Toolbar };
