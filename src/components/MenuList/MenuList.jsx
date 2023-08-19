import './MenuList.css';
import MenuListItem from '../MenuListItem/MenuListItem';

export default function MenuList({ menuItems, addToOrder }) {
  const items = menuItems.map(item =>
    <MenuListItem
      key={item._id}
      menuItem={item}
      addToOrder={addToOrder}
    />
  );
  return (
    <main className="MenuList">
      {items}
    </main>
  );
}